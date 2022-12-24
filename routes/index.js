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

router.get('/serv',function(req,res){
    res.render('services')
})


router.get('/cont',function(req,res){
    res.render('contact')
})

router.get('/serv',function(req,res){
    res.render('services')
})

router.get('/dione',function(req,res){
    res.render('team')
})

router.get('/emily',function(req,res){
    res.render('team1')
})

router.get('/joseph',function(req,res){
    res.render('team2')
})


router.get('/melody',function(req,res){
    res.render('team3')
})

router.get('/paul',function(req,res){
    res.render('team4')
})


router.get('/phinias',function(req,res){
    res.render('team5')
})















module.exports = router;