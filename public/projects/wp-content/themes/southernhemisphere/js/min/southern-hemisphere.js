jQuery(document).ready(function($) {

    //Menu Toggle Body Overflow
    $(document).on('click', '.menu-toggle', function() {
        $('body').toggleClass('body-overflow-y');
    });

    //Tooltip Hover
    $('.tooltip-svg-wrapper').hover(function() {
        $('.difficulty-tooltip').addClass('hovered');
    }, function() {
        setTimeout(() => {
            $('.difficulty-tooltip').removeClass('hovered');
        }, 1000);
    });

    //Responsive Blocks
    if ($("[responsive-height-tablet],[responsive-height-medium],[responsive-height-small]").length) {
        $("[responsive-height-tablet],[responsive-height-medium],[responsive-height-small]").each(function(index, element) {
            if (typeof $(this).attr("desktop-height") == "undefined") {
                $(this).attr("desktop-height", this.style.height);
            }
        });

        function changeSpacerHeights() {
            var vw = $(window).width();
            if (vw < 1080) {

                $("[responsive-height-tablet]").each(function(index, element) {

                    $(this).css("height", $(this).attr("responsive-height-tablet") + "px");

                });

                if (vw < 767) {

                    $("[responsive-height-medium]").each(function(index, element) {

                        $(this).css("height", $(this).attr("responsive-height-medium") + "px");

                    });

                    if (vw < 480) {

                        $("[responsive-height-small]").each(function(index, element) {

                            $(this).css("height", $(this).attr("responsive-height-small") + "px");

                        });
                    }

                }

            } else {
                $("[responsive-height-tablet],[responsive-height-medium],[responsive-height-small]").each(function(index, element) {
                    if (typeof $(this).attr("desktop-height") !== "undefined") {
                        $(this).css("height", $(this).attr("desktop-height"));
                    }
                });
            }
        }
        changeSpacerHeights();
        $(window).resize(changeSpacerHeights);
    }

    //Form Input Focus
    $(document).on('focus keyup change', '.form-wrapper .input-wrap input.wpcf7-text, .form-wrapper .input-wrap input.wpcf7-number, .form-wrapper .input-wrap textarea', function() {
        $('.input-wrap input.wpcf7-text, .input-wrap textarea').each(function(i, obj) {
            if ($(this).val() == "") {
                $(this).closest('.form-wrapper .input-wrap').removeClass('focused');
            }
        });
        $(this).closest('.form-wrapper .input-wrap').addClass('focused');
    });

    //Unfocus Form Input
    $(document).on('click', function(e) {
        $('.input-wrap input.wpcf7-text, .input-wrap input.wpcf7-number, .input-wrap textarea').each(function(i, obj) {
            if ($(e.target).is('.input-wrap.focused input.wpcf7-text, .input-wrap input.wpcf7-number, .input-wrap textarea')) {} else {
                if ($(this).val() == "") {
                    $(this).closest('.form-wrapper .input-wrap').removeClass('focused');
                }
            }
        });

    });

    //Accordions
    $(document).on('click', '.wp-block-wwx-accordions .accordion-title', function() {
        $(this).closest('.wp-block-wwx-accordions').toggleClass('active');
    });

    //Standard Category Filter Pills
    $(document).on('click', '.category-filter-wrapper .filter-term.pill', function() {
        $('.category-filter-wrapper .filter-term.pill').removeClass('active');
        $(this).addClass('active');
        $('.post-cards-wrapper-outer').attr('term-id', $(this).attr('term-id'));
        let ajaxFunc = $('.post-cards-wrapper-outer').attr('ajax');

        switch (ajaxFunc) {
            case "resource_ajax_function":
                resource_ajax_function();
                break;

            case "projects_ajax_function":
                projects_ajax_function();
                break;

            case "training_ajax_function":
                training_ajax_function();
                break;

            default:
                break;
        }

    });

    //Multi Select Add & Remove
    $.fn.appendAttr = function(attrName, suffix) {
        this.attr(attrName, function(i, val) {
            return val + suffix + ',';
        });
        return this;
    };

    $(document).on('click', '.active-option-wrapper, .active-options-wrapper', function(e) {
        if ($(e.target).is('.remove-icon')) {
            e.preventDefault();
            return;
        }

        $('.options-wrapper').not($(this).closest('.filter-dropdown-wrapper').find('.options-wrapper')).removeClass('active');
        $(this).closest('.filter-dropdown-wrapper').find('.options-wrapper').toggleClass('active');

    });

    $(document).on('click', function(e) {
        if ($(e.target).closest('.filter-dropdown-wrapper').length === 0) {
            $('.options-wrapper').removeClass('active');
        }
    });

    //Client Options
    $(document).on('click', '.level-filter-wrapper.training .filter-option', function() {
        let selectedOption = $(this).text();
        $('.level-filter-wrapper .filter-option').removeClass('active');
        $(this).addClass('active');
        $('.level-filter-wrapper.training .active-option').html(selectedOption);
        $('.post-cards-wrapper-outer').attr('level', $(this).attr('term-id'));
        $('.options-wrapper').removeClass('active');
    });

    //Client Options
    $(document).on('click', '.level-filter-wrapper:not(.location):not(.sector) .filter-option', function() {
        let selectedOption = $(this).text();
        $('.level-filter-wrapper .filter-option').removeClass('active');
        $(this).addClass('active');
        $('.level-filter-wrapper.clients .active-option').html(selectedOption);
        $('.post-cards-wrapper-outer').attr('level', $(this).attr('term-id'));
        $('.options-wrapper').removeClass('active');
    });

    //Sector Options
    $(document).on('click', '.level-filter-wrapper:not(.location):not(.clients) .filter-option', function() {
        let selectedOption = $(this).text();
        $('.level-filter-wrapper .filter-option').removeClass('active');
        $(this).addClass('active');
        $('.level-filter-wrapper.sector .active-option').html(selectedOption);
        $('.post-cards-wrapper-outer').attr('sector', $(this).attr('term-id'));
        $('.options-wrapper').removeClass('active');
    });

    //Location Options
    $(document).on('click', '.level-filter-wrapper.location .filter-option', function() {
        let selectedOption = $(this).text();
        $('.level-filter-wrapper.location .filter-option').removeClass('active');
        $(this).addClass('active');
        $('.level-filter-wrapper.location .active-option').html(selectedOption);
        $('.post-cards-wrapper-outer').attr('location', $(this).attr('term-id'));
        $('.options-wrapper').removeClass('active');
    });

    //Course Search Filter Multiselect
    $(document).on('click', '.multiselect-wrapper .filter-option:not(.selected)', function() {
        $(this).addClass('selected');
        let selectedOption = $(this).text();
        $('.multiselect-wrapper .active-options-wrapper').append(`<p class="active-option wwx-mb-0 noselect" term-id="${$(this).attr('term-id')}">${selectedOption}<span class="remove-icon"></span></p>`);
        $('.post-cards-wrapper-outer:not(.featured-projects)').appendAttr('discipline-id', $(this).attr('term-id'));
    });

    $(document).on('click', '.multiselect-wrapper .filter-option.selected', function() {
        let multiSelect = $('.post-cards-wrapper-outer:not(.featured-projects)').attr('discipline-id');

        if (multiSelect.indexOf($(this).attr('term-id')) !== false) {
            multiSelect = multiSelect.replace($(this).attr('term-id') + ',', '');
            $('.post-cards-wrapper-outer:not(.featured-projects)').attr('discipline-id', multiSelect);
            $(this).closest('.multiselect-wrapper').find(`.active-option[term-id="${$(this).attr('term-id')}"]`).remove();
            $(this).removeClass('selected');
        }
    });

    //Course Search Filter Multiselect Remove
    $(document).on('click', '.multiselect-wrapper .remove-icon', function() {
        $(this).closest('.active-option').remove();

        let removedTerm = $(this).closest('.active-option').attr('term-id');
        $(`.options-wrapper .filter-option[term-id="${removedTerm}"]`).removeClass('selected');

        let multiSelect = $('.post-cards-wrapper-outer:not(.featured-projects)').attr('discipline-id');

        if (multiSelect.indexOf($(this).attr('term-id')) !== false) {
            multiSelect = multiSelect.replace(removedTerm + ',', '');
            $('.post-cards-wrapper-outer:not(.featured-projects)').attr('discipline-id', multiSelect);
            $(this).closest('.multiselect-wrapper').find(`.active-option[term-id="${$(this).attr('term-id')}"]`).remove();
        }
    });

    //Clear Training Filters
    $(document).on('click', '.clear-filters:not(.projects) > p', function() {
        $('.post-cards-wrapper-outer:not(.featured-projects)').attr('discipline-id', '');
        $('.post-cards-wrapper-outer:not(.featured-projects)').attr('level', '');
        $('.multiselect-wrapper .active-option:not(.placeholder)').remove();
        $('.level-filter-wrapper:not(.location) .active-option').html('<p class="active-option wwx-mb-0 noselect" term-id="">Select Level</p>');
        $(`.options-wrapper .filter-option[term-id]`).removeClass('selected');
        training_ajax_function();
    });

    //Clear Project Filters
    $(document).on('click', '.clear-filters.projects > p', function() {
        $('.post-cards-wrapper-outer').attr('discipline-id', '');
        $('.post-cards-wrapper-outer').attr('level', '');
        $('.post-cards-wrapper-outer').attr('location', '');
        $('.post-cards-wrapper-outer').attr('sector', '');
        $('.multiselect-wrapper .active-option:not(.placeholder)').remove();
        $('.level-filter-wrapper.clients .active-option').html('<p class="active-option wwx-mb-0 noselect" term-id="">Select Client Type</p>');
        $('.level-filter-wrapper.location .active-option').html('<p class="active-option wwx-mb-0 noselect" term-id="">Select Region</p>');
        $('.level-filter-wrapper.sector .active-option').html('<p class="active-option wwx-mb-0 noselect" term-id="">Select Sector</p>');
        $(`.options-wrapper .filter-option[term-id]`).removeClass('selected');
        project_list_ajax_func();
    });

    //Training Filter Button
    $(document).on('click', '#find-courses', function() {
        training_ajax_function();
    });

    //Project List Filter Button
    $(document).on('click', '#filter-projects', function() {
        $('.post-cards-wrapper').append('<div class="lds-dual-ring"></div>');
        project_list_ajax_func();
    });

    //Post Search Button
    $(document).on('click', '.post-search button[type="submit"]', function(e) {
        e.preventDefault();
        $('.post-cards-wrapper-outer').attr('search', $('.post-search .wp-block-search__inside-wrapper input').val());
        resource_ajax_function();
    });

    //Team Popup Open
    $(document).on('click', '.card-wrapper.team', function(e) {
        e.preventDefault();
        $('.post-cards-wrapper').attr('post-id', $(this).attr('post-id'));

        $('.modal-inner').fadeOut(0).promise().done(function() {
            $('.modal-overlay').addClass('active');
            $('body').css('overflow', 'hidden');
            $('.modal-outer').append('<div class="lds-dual-ring"></div>');
        });

        team_ajax_function();
    });

    // Book Course Popup
    $(document).on('click', '.book-course', function() {
        var modalName = $(this).attr('id');
        var modalTarget = $('#' + modalName + '.modal-overlay');
        modalTarget.addClass('active');
        $('body').css('overflow', 'hidden');

        if (modalName == 'in-house-course') {
            $('#post-title-hidden').val($('#in-house-course .modal-outer').data('course-name'))
        }
    });

    //Close Popup
    $(document).on('click', function(e) {
        if ($(e.target).is('.close-popup') || $(e.target).is('.modal-overlay.active')) {
            $('.modal-overlay').removeClass('active');
            $('body').css('overflow', '');
            return;
        }
    });

    //Load More
    if ($('.post-cards-wrapper-outer.resources-outer').length > 0 && Number($('.post-cards-wrapper-outer.resources-outer').attr('post-amount')) <= Number($('.post-cards-wrapper-outer.resources-outer').attr('number-posts'))) {
        $('#ajax-load-more-resources').fadeOut();
    }
    $(document).on('click', '#ajax-load-more-resources', function() {
        $('.post-cards-wrapper-outer').attr('number-posts', Number($('.post-cards-wrapper-outer').attr('number-posts')) + 15);
        resource_ajax_function();
    });

    if ($('.post-cards-wrapper-outer.project-list-outer').length > 0 && Number($('.post-cards-wrapper-outer.project-list-outer').attr('post-amount')) <= Number($('.post-cards-wrapper-outer.project-list-outer').attr('number-posts'))) {
        $('#ajax-load-more-projects').fadeOut();
    }
    $(document).on('click', '#ajax-load-more-projects', function() {
        project_list_ajax_func();
    });

    //Ajax Team Popup
    function team_ajax_function() {

        let postID = $('.post-cards-wrapper').attr('post-id');

        $.ajax({
            url: southern_hemisphere_obj.ajaxurl,
            type: "post",
            data: {
                'action': 'team_ajax_id',
                'postID': postID,
            },
            success: function(response) {
                console.log('success');
                $('.modal-overlay .modal-outer').html(response).promise().done(function() {
                    $('.lds-dual-ring').remove();
                    $('.modal-inner').fadeIn(400);
                });
            }
        });
    }

    //Ajax Resource Filters
    function resource_ajax_function() {

        let termID = $('.post-cards-wrapper-outer').attr('term-id');
        let amountAjax = Number($('.post-cards-wrapper-outer').attr('number-posts'));
        let searchVal = $('.post-cards-wrapper-outer').attr('search');
        let postAmount = $('.post-cards-wrapper-outer.resources-outer').attr('post-amount');

        $('.post-cards-wrapper-outer').attr('number-posts', amountAjax);

        $.ajax({
            url: southern_hemisphere_obj.ajaxurl,
            type: "post",
            data: {
                'action': 'resources_query',
                'termID': termID,
                'amount': amountAjax,
                'searchVal': searchVal,
                'postAmount': postAmount,
            },
            success: function(response) {
                $('.card-and-loader-wrapper').append('<div class="lds-dual-ring"></div>').promise().done(function() {
                    $('.post-cards-wrapper-outer').fadeOut().promise().done(function() {
                        $('.post-cards-wrapper-outer').html(response).fadeIn();
                        $('.lds-dual-ring').remove();
                    });
                });
            }
        });
    }

    //Ajax Projects Filters
    function projects_ajax_function() {

        let termID = $('.post-cards-wrapper-outer:not(.project-list-outer)').attr('term-id');
        let amountAjax = Number($('.post-cards-wrapper-outer:not(.project-list-outer)').attr('number-posts'));

        $.ajax({
            url: southern_hemisphere_obj.ajaxurl,
            type: "post",
            data: {
                'action': 'projects_query',
                'termID': termID,
                'amount': amountAjax,
            },
            success: function(response) {
                $('.card-and-loader-wrapper').append('<div class="lds-dual-ring"></div>').promise().done(function() {
                    $('.post-cards-wrapper-outer:not(.project-list-outer)').fadeOut().promise().done(function() {
                        $('.post-cards-wrapper-outer:not(.project-list-outer)').html(response).fadeIn();
                        $('.lds-dual-ring').remove();
                    });
                });

            }
        });
    }

    //Ajax Training Filters
    function training_ajax_function() {

        let termID = $('.post-cards-wrapper-outer').attr('term-id');
        let disciplineID = $('.post-cards-wrapper-outer').attr('discipline-id').split(',');
        disciplineID = disciplineID.filter(n => n);
        let level = $('.post-cards-wrapper-outer').attr('level');

        $.ajax({
            url: southern_hemisphere_obj.ajaxurl,
            type: "post",
            data: {
                'action': 'training_query',
                'termID': termID,
                'discipline': disciplineID,
                'level': level,
            },
            success: function(response) {;
                $('.card-and-loader-wrapper').append('<div class="lds-dual-ring"></div>').promise().done(function() {
                    $('.post-cards-wrapper-outer').fadeOut().promise().done(function() {
                        $('.post-cards-wrapper-outer').html(response).fadeIn();
                        $('.lds-dual-ring').remove();
                    });
                });

            }
        });
    }

    //Ajax Project List Filters
    function project_list_ajax_func() {

        let disciplineID = $('.post-cards-wrapper-outer.project-list-outer').attr('discipline-id').split(',');
        disciplineID = disciplineID.filter(n => n);
        let level = $('.post-cards-wrapper-outer.project-list-outer').attr('level');
        let location = $('.post-cards-wrapper-outer.project-list-outer').attr('location');
        let amountAjax = Number($('.post-cards-wrapper-outer.project-list-outer').attr('number-posts')) + 12;
        let post_amount = $('.post-cards-wrapper-outer.project-list-outer').attr('post-amount');
        let sector = $('.post-cards-wrapper-outer.project-list-outer').attr('sector');

        $('.post-cards-wrapper-outer.project-list-outer').attr('number-posts', amountAjax);

        $.ajax({
            url: southern_hemisphere_obj.ajaxurl,
            type: "post",
            data: {
                'action': 'project_list_ajax',
                'category': disciplineID,
                'client': level,
                'location': location,
                'amount': amountAjax,
                'sector': sector,
            },
            success: function(response) {
                $('.card-and-loader-wrapper').append('<div class="lds-dual-ring"></div>').promise().done(function() {
                    $('.post-cards-wrapper-outer.project-list-outer').fadeOut().promise().done(function() {
                        $('.post-cards-wrapper-outer.project-list-outer').html(response).fadeIn();
                        $('.lds-dual-ring').remove();
                    });
                });

                if (post_amount <= amountAjax) {
                    $('#ajax-load-more-projects').fadeOut();
                }
            }
        });
    }

    //Slick
    if ($(".slick-slider-group").length > 0) {
        $(".slick-slider-group .post-cards-wrapper").slick({
            swipeToSlide: true,
            infinite: false,
            draggable: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1350,
                    settings: {
                        arrows: false,
                        dots: true,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                        dots: true,
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                        dots: true,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: true,
                    }
                }
            ]
        });

    }

    //Quote Carousel
    if ($(".slick-slide-dots").length > 0) {
        $(".slick-slide-dots").slick({
            swipeToSlide: true,
            infinite: false,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
        });
    }

    //Home Client Carousel
    if ($(".slick-slide-arrows").length > 0) {
        $(".home-clients-wrapper.slick-slide-arrows").slick({
            swipeToSlide: true,
            infinite: false,
            draggable: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: true,
            responsive: [{
                    breakpoint: 1360,
                    settings: {
                        slidesToShow: 4,
                        arrows: true,
                        dots: false,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        arrows: true,
                        dots: false,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        arrows: true,
                        dots: false,
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        arrows: true,
                        dots: false,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        arrows: true,
                        dots: false,
                    }
                }
            ]
        });
    }

    //Home Quote Carousel
    if ($(".slick-slide-arrows").length > 0) {
        $(".home-quotes-module-outer .slick-slide-arrows").slick({
            swipeToSlide: true,
            infinite: false,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true,
                    adaptiveHeight: true,
                }
            }, ]
        });
    }

    //Animations

    var controller = new ScrollMagic.Controller();

    $('[animate-in]').each(function() {

        let animationName = $(this).attr("animate-in") + " animate__animated";
        var sceneAnimation = new ScrollMagic.Scene({
                triggerElement: this,
                reverse: false,
                triggerHook: 0.9
            })
            .setClassToggle(this, animationName)
            .addTo(controller);
    });

    function responsiveAnimations(sceneAnimation) {
        if ($(window).width() < 991) {
            $('[animate-in]').css('visibility', 'visible');
            controller.enabled(false);
        } else {
            controller.enabled(true);
        }
    }

    responsiveAnimations();

    $(window).resize(function() {
        responsiveAnimations();
    });

});

ScrollMagic._util.addClass = function _patchedAddClass(elem, classname) {
    if (classname) {
        if (elem.classList) {
            classname.split(' ').forEach(function _addCls(c) {
                elem.classList.add(c);
            });
        } else elem.className += ' ' + classname;
    }
};
ScrollMagic._util.removeClass = function _patchedRemoveClass(elem, classname) {
    if (classname) {
        if (elem.classList) {
            classname.split(' ').forEach(function _removeCls(c) {
                elem.classList.remove(c);
            });
        } else elem.className = elem.className.replace(new RegExp('(^|\b)' + classname.split(' ').join('|') + '(\b|$)', 'gi'), ' ');
    }
};