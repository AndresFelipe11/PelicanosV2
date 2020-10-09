'use strict';

module.exports = function(Player) {

    Player.sendEmail=(message, subject ,emailAddresses, cb)=>{
        Player.app.models.Email.send({
            to: emailAddresses,
            from: "Pelicanos Beach Voley",
            subject: subject,
            text: message,
            html: message
        }, function (err, mail) {
            console.log("email enviado!!!");
            if (err) return err;
        });
        cb(null, 'message sent: ' + message);
    }

    Player.remoteMethod( 'sendEmail',
    {
       
        http: {
            path: '/sendEmail', verb: 'post'
        },
        description: [
            "Api to send email messages."
        ],
        accepts: [
            {
                arg: 'message',
                type: 'string',
                required: true
            },
            {
                arg: 'subject',
                type: 'string',
                required: true
            },
            {
                arg: 'emailAddresses',
                type: 'string',
                required: true
            }
        ],
        returns: { arg: 'reponse', type: 'string' }
    });
  };


