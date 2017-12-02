var mongoose = require('mongoose');

var BigTextNounSchema = new mongoose.Schema({
    noun: String
}, {
    versionKey: false
});

module.exports = mongoose.model('BigTextNoun', BigTextNounSchema);