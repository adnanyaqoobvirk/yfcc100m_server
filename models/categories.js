var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    display_name: String,
    name: String,
    parent: {
        type: String
    },
}, {
    timestamps: true
});

var Categories = mongoose.model('Category', categorySchema);
module.exports = Categories;