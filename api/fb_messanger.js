var request = require('request');
var token = "EAAKZCjmh9l8IBABpoKX0REGHvpfCoxIvflcxhH5JZCkXN76UVMCjeRaoKzLRddw0oM0ZBJCQj7wrPu6pFBpMB2M7UZCqN8StEcsNYJduMr9fy1SBEZCL0hSpZAUfpIZAfsHzbI6EcBh6QWIZC00tLrvhdvi7wsQUtqaxZB3kqPrU82wZDZD";

module.exports = {
  sendTextMessage: (sender, text) => {
    console.log(sender);
    messageData = {
      text:text
    }
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  },
  sendItems(sender, items) {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: items
            }
          }
        }
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  },
  senderAction(sender, action) {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        sender_action: action
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  },
  quickReplies(sender) {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: {
          text: 'pick a color',
          "quick_replies":[
            {
              "content_type":"text",
              "title":"Red",
              "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
            },
            {
              "content_type":"text",
              "title":"Green",
              "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
            }
          ]
        }
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  }
}