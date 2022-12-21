/**
 * CodeDropz Uploader v1.3.6.5
 * Copyright 2018 Glen Mongaya
 * CodeDrop Drag&Drop Uploader
 * @version 1.3.6.5
 * @author CodeDropz, Glen Don L. Mongaya
 * @license The MIT License (MIT)
 */

// CodeDropz Drag and Drop Plugin
! function(a) {
    a.fn.CodeDropz_Uploader = function(e) {
        this.each(function() {
            var d = a(this),
                r = a.extend({
                    handler: d,
                    color: "#000",
                    background: "",
                    server_max_error: "Uploaded file exceeds the maximum upload size of your server.",
                    max_file: d.data("max") ? d.data("max") : 10,
                    max_upload_size: d.data("limit") ? d.data("limit") : "10485760",
                    supported_type: d.data("type") ? d.data("type") : "jpg|jpeg|JPG|png|gif|pdf|doc|docx|ppt|pptx|odt|avi|ogg|m4a|mov|mp3|mp4|mpg|wav|wmv|xls",
                    text: "Drag & Drop Files Here",
                    separator: "or",
                    button_text: "Browse Files",
                    on_success: ""
                }, e),
                s = d.data("name") + "_count_files";
            localStorage.setItem(s, 1);
            var t = '<div class="codedropz-upload-handler"><div class="codedropz-upload-container"><div class="codedropz-upload-inner"><' + dnd_cf7_uploader.drag_n_drop_upload.tag + ">" + r.text + "</" + dnd_cf7_uploader.drag_n_drop_upload.tag + "><span>" + r.separator + '</span><div class="codedropz-btn-wrap"><a class="cd-upload-btn" href="javascript:void(0)">' + r.button_text + '</a></div></div></div><span class="dnd-upload-counter"><span>0</span> ' + dnd_cf7_uploader.dnd_text_counter + " " + parseInt(r.max_file) + "</span></div>";
            r.handler.wrapAll('<div class="codedropz-upload-wrapper"></div>'), r.supported_type = r.supported_type.replace(/[^a-zA-Z0-9| ]/g, "");
            var o = r.handler.parents("form"),
                n = r.handler.parents(".codedropz-upload-wrapper"),
                p = a('input[type="submit"]', o);
            r.handler.after(t), a(".codedropz-upload-handler", n).on("drag dragstart dragend dragover dragenter dragleave drop", function(a) {
                a.preventDefault(), a.stopPropagation()
            }), a(".codedropz-upload-handler", n).on("dragover dragenter", function(e) {
                a(this).addClass("codedropz-dragover")
            }), a(".codedropz-upload-handler", n).on("dragleave dragend drop", function(e) {
                a(this).removeClass("codedropz-dragover")
            }), a("a.cd-upload-btn", n).on("click", function(a) {
                a.preventDefault(), r.handler.val(null), r.handler.click()
            }), a(".codedropz-upload-handler", n).on("drop", function(a) {
                l(a.originalEvent.dataTransfer.files, "drop")
            }), r.handler.on("change", function(a) {
                l(this.files, "click")
            }), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && d.removeAttr("accept");
            var l = function(e, t) {
                    if (!(!e.length > 1)) {
                        var p = new FormData;
                        p.append("action", "dnd_codedropz_upload"), p.append("type", t), p.append("security", dnd_cf7_uploader.ajax_nonce), p.append("form_id", d.data("id")), p.append("upload_name", d.data("name")), d.data("black-list") && p.append("blacklist-types", d.data("black-list")), a("span.has-error", r.handler).remove(), a.each(e, function(e, t) {
                            if (void 0 !== p.delete && p.delete("upload-file"), localStorage.getItem(s) > r.max_file) return !a("span.has-error-msg", n).length > 0 && (err_msg = dnd_cf7_uploader.drag_n_drop_upload.max_file_limit, n.append('<span class="has-error-msg">' + err_msg.replace("%count%", r.max_file) + "</span>")), !1;
                            var l = i.createProgressBar(t),
                                c = !1;
                            t.size > r.max_upload_size && (a(".dnd-upload-details", a("#" + l)).append('<span class="has-error">' + dnd_cf7_uploader.drag_n_drop_upload.large_file + "</span>"), c = !0), regex_type = RegExp("(.*?).(" + r.supported_type + ")$"), !1 !== c || regex_type.test(t.name.toLowerCase()) || (a(".dnd-upload-details", a("#" + l)).append('<span class="has-error">' + dnd_cf7_uploader.drag_n_drop_upload.inavalid_type + "</span>"), c = !0), localStorage.setItem(s, Number(localStorage.getItem(s)) + 1), !1 === c && (p.append("upload-file", t), a.ajax({
                                url: r.ajax_url,
                                type: o.attr("method"),
                                data: p,
                                dataType: "json",
                                cache: !1,
                                contentType: !1,
                                processData: !1,
                                xhr: function() {
                                    var a = new window.XMLHttpRequest;
                                    return a.upload.addEventListener("progress", function(a) {
                                        if (a.lengthComputable) {
                                            var e = parseInt(100 * (a.loaded / a.total));
                                            i.setProgressBar(l, e - 1)
                                        }
                                    }, !1), a
                                },
                                complete: function() {
                                    i.setProgressBar(l, 100)
                                },
                                success: function(e) {
                                    e.success ? (i.setProgressBar(l, 100), a.isFunction(r.on_success) && r.on_success.call(this, d, l, e)) : (a(".dnd-progress-bar", a("#" + l)).remove(), a(".dnd-upload-details", a("#" + l)).append('<span class="has-error">' + e.data + "</span>"), a('input[type="submit"]', o).removeClass("disabled").prop("disabled", !1), a("#" + l).removeClass("in-progress"))
                                },
                                error: function(e, d, s) {
                                    a(".dnd-progress-bar", a("#" + l)).remove(), a(".dnd-upload-details", a("#" + l)).append('<span class="has-error">' + r.server_max_error + "</span>"), a('input[type="submit"]', o).removeClass("disabled").prop("disabled", !1), a("#" + l).removeClass("in-progress")
                                }
                            }))
                        })
                    }
                },
                i = {
                    createProgressBar: function(e) {
                        var d = a(".codedropz-upload-handler", n),
                            r = "dnd-file-" + Math.random().toString(36).substr(2, 9),
                            t = '<div class="dnd-upload-image"><span class="file"></span></div><div class="dnd-upload-details"><span class="name"><span>' + e.name + "</span><em>(" + i.bytesToSize(e.size) + ')</em></span><a href="javascript:void(0)" title="' + dnd_cf7_uploader.drag_n_drop_upload.delete.title + '" class="remove-file" data-storage="' + s + '"><span class="dnd-icon-remove"></span></a><span class="dnd-progress-bar"><span></span></span></div>';
                        return d.after('<div id="' + r + '" class="dnd-upload-status">' + t + "</div>"), r
                    },
                    setProgressBar: function(e, d) {
                        var r = a(".dnd-progress-bar", a("#" + e));
                        return r.length > 0 && (i.disableBtn(p), progress_width = d * r.width() / 100, a("#" + e).addClass("in-progress"), 100 == d ? a("span", r).width("100%").text(d + "% ") : a("span", r).animate({
                            width: progress_width
                        }, 10).text(d + "% "), 100 == d && a("#" + e).addClass("complete").removeClass("in-progress")), !1
                    },
                    bytesToSize: function(a) {
                        return 0 === a ? "0" : fileSize = (kBytes = a / 1024) >= 1024 ? (kBytes / 1024).toFixed(2) + "MB" : kBytes.toFixed(2) + "KB"
                    },
                    disableBtn: function(a) {
                        a.length > 0 && a.addClass("disable").prop("disabled", !0)
                    }
                }
        }), a(document).on("click", ".dnd-icon-remove", function(d) {
            var r = a(this),
                s = r.parents(".dnd-upload-status"),
                t = r.parents(".codedropz-upload-wrapper"),
                o = r.parent("a").attr("data-storage"),
                n = Number(localStorage.getItem(o));
            if (s.hasClass("in-progress")) return !1;
            if (a(".has-error", s).length > 0) return s.remove(), localStorage.setItem(o, n - 1), !1;
            r.addClass("deleting").text(dnd_cf7_uploader.drag_n_drop_upload.delete.text + "...");
            var p = {
                path: s.find('input[type="hidden"]').val(),
                action: "dnd_codedropz_upload_delete",
                security: dnd_cf7_uploader.ajax_nonce
            };
            a.post(e.ajax_url, p, function(e) {
                e.success && (s.remove(), localStorage.setItem(o, n - 1), a(".dnd-upload-status", t).length <= 1 && a("span.has-error-msg", t).remove(), a(".dnd-upload-counter span", t).text(Number(localStorage.getItem(o)) - 1))
            }), a("span.has-error-msg").remove()
        })
    }
}(jQuery);