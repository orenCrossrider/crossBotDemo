var EbayApi = require('./api/ebay');
var FbMessager = require('./api/fb_messanger');
var searchHandler = require('./search_handler');

function searchItems(sender, message) {
    EbayApi.search([message.text], {
      callback: searchHandler.respondWithItems,
      sender: sender
    });
}

function fbTyping(sender) {
    FbMessager.senderAction(sender, 'typing_on');
}

function fbSeen(sender) {
    FbMessager.senderAction(sender, 'mark_seen');
}

function fbTypingOff(sender) {
    FbMessager.senderAction(sender, 'typing_off');
}

module.exports = {
    doSomething: function (sender, message) {
        FbMessager.quickReplies(sender);
    }
};
