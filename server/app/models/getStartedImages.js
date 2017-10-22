var mongoose = require('mongoose');

var GetStartedImagesSchema = new mongoose.Schema({
    imageName: String,
    description: String,
    created: Date
});

module.exports = mongoose.model('GetStartedImages', GetStartedImagesSchema);