var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Categories = require('../models/categories');

var categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

categoryRouter.route('/')
.get(function (req, res, next) {
    Categories.find({}, function (err, category) {
        if (err) throw err;
        res.json(category);
    });
});

categoryRouter.route('/:categoryId')
.get(function (req, res, next) {
    Categories.findById(req.params.categoryId, function (err, category) {
        if (err) throw err;
        res.json(category);
    });
});

module.exports = categoryRouter