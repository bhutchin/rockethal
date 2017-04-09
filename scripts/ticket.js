var Conversation = require('hubot-conversation');
module.exports = function (robot) {
  var newTicket = new Conversation(robot);
  robot.respond(/(.*)(create|new)(.*)(ticket)(.*)/i, function (msg) {
      var dialog = newTicket.startDialog(msg);

      msg.reply('Would you like me to create a new ticket for you?');
      dialog.addChoice(/(no|nah|nup)/i, function (msg2) {
          msg2.reply(whatResponse);
      });
      dialog.addChoice(/(yeah|yes|yep)/i, function (msg2) {
          msg2.reply("Sure what was the subject?");
          dialog.addChoice(/(.*)/i, function (msg3) {
              var subject = msg3.match[0];
              subject = "\""+subject+"\"";
              msg3.reply("And what was the rest of the info?");
                dialog.addChoice(/(.*)/i, function (msg4) {
                var body = msg4.match[0]
                body = "\""+body+"\"";
                msg4.reply("Forwarding that on now.");
                  var child_process = require('child_process');
                  //var sender = msg.message.user.name.toLowerCase()
                  var sender = "\"brent.hutchin\"";
                  child_process.exec('/usr/local/bin/createticket.sh ' + sender + subject + body,
                  function (error, stdout, stderr) {
                    if (error !== null) {
                      console.log(error);
                    } else {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    }
                  });
               });
            });
      });
   });
};
