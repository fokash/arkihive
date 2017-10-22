var mongoose = require('mongoose');

var ClientSayInfoSchema = new mongoose.Schema({
    clientphoto: String,
    clientcomment: String,
    clientname: String,
    clientlocation: String,
    created: Date
});

module.exports = mongoose.model('ClientSayInfo', ClientSayInfoSchema);