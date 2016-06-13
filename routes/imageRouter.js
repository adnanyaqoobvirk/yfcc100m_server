var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Images = require('../models/images');

var imageRouter = express.Router();
imageRouter.use(bodyParser.json());

imageRouter.route('/')
.get(function (req, res, next) {
    Images.find({}, function (err, image) {
        if (err) throw err;
        res.json(image);
    });
});

imageRouter.route('/:imageId')
.get(function (req, res, next) {
    Images.findById(req.params.imageId, function (err, image) {
        if (err) throw err;
        res.json(image);
    });
});

imageRouter.route('/:category/:limit')
.get(function (req, res, next) {
    if(req.params.limit != -1){
        Images.find({categories: req.params.category}).limit(req.params.limit).exec(function (err, image) {
            if (err) throw err;
            res.json(image);
        });
    }else{
        Images.find({categories: req.params.category}).exec(function (err, image) {
            if (err) throw err;
            res.json(image);
        });
    }
});

module.exports = imageRouter