var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
const fs = require('fs')
var path = require('path');


router.get('/',function(req,res){
    res.render('index')
})

router.get('/abt',function(req,res){
    res.render('about')
})

router.get('/proj',function(req,res){
    res.render('projects')
})

router.get('/cont',function(req,res){
    res.render('contact')
})












module.exports = router;