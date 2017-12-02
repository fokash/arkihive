var mongoose = require('mongoose');

var BigTextVerbSchema = new mongoose.Schema({
    verb: String
}, {
    versionKey: false
});

module.exports = mongoose.model('BigTextVerb', BigTextVerbSchema);