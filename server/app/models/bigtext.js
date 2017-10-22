var mongoose = require('mongoose');

var BigTextSchema = new mongoose.Schema({
    text: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Bigtext', BigTextSchema);