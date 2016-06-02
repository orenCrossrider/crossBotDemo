var FbMessager = require('./api/fb_messanger');

module.exports = {
  respondWithItems: (apiResult, sender) => {
    FbMessager.sendTextMessage(sender, `${apiResult.totalEntries} items found:`);
    FbMessager.sendItems(sender, apiResult.items);
  }
}