var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    thumbnail_url: String,
    download_url: String,
    width: Number,
    height: Number,
    categories: [{
        type: String
    }]
}, {
    timestamps: true
});

var Images = mongoose.model('Image', imageSchema);
module.exports = Images;