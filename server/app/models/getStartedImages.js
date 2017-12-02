var mongoose = require('mongoose');

var GetStartedImagesSchema = new mongoose.Schema({
    imageName: String,
    description: String,
    created: Date
}, {
    versionKey: false
});

module.exports = mongoose.model('GetStartedImages', GetStartedImagesSchema);