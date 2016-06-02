var EbayApi = require('./api/ebay');
var searchHandler = require('./search_handler');
var Botkit = require('botkit');

var controller = Botkit.facebookbot({
    debug: true,
    access_token: "EAAKZCjmh9l8IBAInBtUODtcMw9ZCACjFUpvsKWUfWhaWe0drqeY5P8RZBQdohlJGDqthCZCQioglyjm88waJgJ4kdNTcDgUYAcVHEMfsuHZC6i9HBy2dddTlZBxe3nq7TRCapZCrZCHQtMoRgbsfH1YseZA2PvGBZBzZADdwT8KQSnbewZDZD",
    verify_token: "orenCross",
});

var bot = controller.spawn({
});

controller.setupWebserver('8099',function(err,webserver) {
  controller.createWebhookEndpoints(controller.webserver, bot, function() {
      console.log('This bot is online!!!');
  });
});

// this is triggered when a user clicks the send-to-messenger plugin
controller.on('message_received', function(bot, message) {
    console.log("Incoming message:");
});

// user said hello
controller.hears(['Eran!'], 'message_received', function(bot, message) {
    bot.reply(message, 'Zehavi');
    bot.reply(message, {
      attachment: {
        type: 'image',
        payload: {
          url: "http://sport1.maariv.co.il/is/772x434/dannymaron208.jpg"
        }
      }
    });
});

controller.hears(['(.*)help me(.*)', 'i dont know', '(.*)help(.*)'], 'message_received', function(bot, message) {
    askWhatToBuy = function(response, convo) {
      convo.ask('Sure. what is your gender?', [
        {
          pattern: '^male',
          callback: function(response, convo) {
            convo.say('Sir.');
            convo.say("I will gamble you like sports. Here are some sports items:");
            EbayApi.search(['sports shoes']).then((result) => {
                convo.say({
                  attachment: {
                    type: 'template',
                    payload: {
                      template_type: 'generic',
                      elements: result.items
                    }
                  }
                })
                convo.next();
            }).catch((error) => {
                console.log("ERORRRRRRRRRRRR", error);
            });
          }
        },
        {
          pattern: '^female',
          callback: function(response, convo) {
            convo.say('Me lady.');
            convo.say("Shoes are always good. Here are some interesting items:");
            EbayApi.search(['lady shoes']).then((result) => {
                convo.say({
                  attachment: {
                    type: 'template',
                    payload: {
                      template_type: 'generic',
                      elements: result.items
                    }
                  }
                })
                convo.next();
            }).catch((error) => {
                console.log("ERORRRRRRRRRRRR", error);
            });
          }
        }
      ])  
    }
    
    bot.startConversation(message, askWhatToBuy);
});
