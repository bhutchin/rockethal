var Conversation = require('hubot-conversation');
module.exports = function (robot) {

    var wifiPassword = new Conversation(robot);
    var staffPass = "*SSID:*180-Staff \n*Password:*Galaxy2!"
    var guestPass = "*SSID:*180-guest \n*Password:*Horiz0n!"
    var shotgunAccess = "All requests for access should go through a member of production working on that job."
    var prodAccess = "Well that seems like it is broken"
    var emailPass = "To reset your email password go to iforgot.bydeluxe.com and that will walk you through it. You will need to use your corporate username which should be lastname first letter of your first name so Bruce Wayne would be wayneB. This can be found in the expiration emails and be highlighted in red"
    var compPass = "To reset your computer password run `passwd` in a terminal on linux or press `ctrl + alt + del` on windows and select the reset password option"
    var thankResponse = ['No worries', 'My pleasure', 'No thank you']

    robot.respond(/(.*)(wifi|password)(.*)(wifi|password)(.*)/, function (msg) {
        var dialog = wifiPassword.startDialog(msg);

        msg.reply('Was it the guest or staff wifi password');
        dialog.addChoice(/guest/i, function (msg2) {
            msg2.reply(guestPass);
        });
        dialog.addChoice(/staff/i, function (msg2) {
            msg.reply(staffPass);
            })
     });

    var systemAccess = new Conversation(robot);
    robot.respond(/(.*)(disk|system|project|server)(.*)(access)(.*)/i, function (msg) {
        var dialog = systemAccess.startDialog(msg);

        msg.reply('Has production added you to the project in shotgun?');
        dialog.addChoice(/(no|nah|nup)/i, function (msg2) {
            msg2.reply(shotgunAccess);
        });
        dialog.addChoice(/(yeah|yes|yep)/i, function (msg2) {
            msg2.reply("and have you received an email from alfred?");
            dialog.addChoice(/(.*)(yes|yeah|yep)/i, function (msg2) {
                msg2.reply("Seems like something is broken forwarding this on now!");
            });
            dialog.addChoice(/(.*)(nah|nope|no|nup)/i, function (msg2) {
                msg2.reply("Wait 5 mins for the systems to catch up and then message me back if you havent heard anything");
            })
        });
     });

    var softUpdate = new Conversation(robot);
    robot.respond(/(.*)(update|install)(.*)(install|update)(.*)/, function (msg) {
        var dialog = softUpdate.startDialog(msg);

        msg.reply('Sure what did you want me to install?');
        dialog.addChoice(/(.*)/i, function (msg2) {
            msg2.reply("can you send me the path to the install files?");
            dialog.addChoice(/(.*)/i, function (msg2) {
                msg2.reply("Thanks forwarding this on now!");
            });
        });
     });

var sadFace = new Conversation(robot);
robot.respond(/(.*)(:([(\[]))(.*)/, function (msg) {
    msg.reply("Robot sadness intensifies")
});

//
// Conversation block about password resetting
//
var passExpire = new Conversation(robot);
robot.respond(/(.*)(password|expire)(.*)(expire|password)(.*)/, function (msg) {
  var alpha = msg.match[0].toLowerCase()
  var dialog = passExpire.startDialog(msg);

  if ( alpha.indexOf("email") >= 0) {
    msg.reply(emailPass);
  } else if ( alpha.indexOf("computer") >= 0) {
    msg.reply(compPass);
  } else {
    msg.reply("Was it your computer or email password?");
    dialog.addChoice(/(computer)/i, function (msg2) {
            msg2.reply(compPass);
        });
        dialog.addChoice(/(email)/i, function (msg2) {
            msg2.reply(emailPass);
        });
        dialog.addChoice(/(both)/i, function (msg2) {
            msg2.reply(emailPass);
             msg2.reply(compPass);
        });
  }
});
};


