var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var mailerConfig = require('../../config/mailer');

var options = {
    auth: {
        api_user: mailerConfig.SENDGRID_USER,
        api_key: mailerConfig.SENDGRID_PASS
    }
}
  
var client = nodemailer.createTransport(sgTransport(options));

module.exports = {
    sendEmail: function(email) {
        return new Promise(function(resolve, reject) {
            client.sendMail(email, function(err, info){
                if (err){
                    reject(err);
                }
                else {
                    resolve(info);
                }
            });
        });
    }
}