var express = require('express');
var router = express.Router();
var Testers = require('./testers');

router.get('/', function(req, res) {
    res.sendfile(__dirname +'/views/index.html')
});

router.route('/facebook/receive')

  .get(function(req, res) {
      if (req.query['hub.verify_token'] === 'orenCross') {
        res.send(req.query['hub.challenge']);
      }
      res.send('Error, wrong validation token');
  })

  .post(function(req, res) {
      messaging_events = req.body.entry[0].messaging;
      for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;
        if (event.message) {
          message = event.message;
            console.log(message);
          if (message.text) {
            text = message.text;
            console.log(`Incoming message from ${sender}: ${text}`);
            // Handle a text message from this sender
            Testers.doSomething(sender, message);
          } else if (message.attachments) {
            console.log('Incoming attachments:');
            attachments = message.attachments;
            for (j = 0; j < attachments.length; j++) {
              attachment = attachments[j];
              console.log(`type: ${attachment.type}`);
              console.log(`payload: ${attachment.payload.url}`);
            }
          }
        }
      }

      res.status(200).send('OK');
  });

module.exports = router;