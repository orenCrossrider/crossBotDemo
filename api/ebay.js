'use strict';

const ebay = require('ebay-api');

let instance = null;
const API_KEY = "Crossrid-CrossBot-PRD-18a129233-d465d4c0";

class EbayApi {

    constructor() {
        if (!instance){
            instance = this;
            this.defaultParams = {
                outputSelector: ['AspectHistogram'],
                paginationInput: {
                  entriesPerPage: 10
                }
            };
        }

      return instance;
    }

    search(keywords, options) {
        console.log("Ebay search...");
        ebay.xmlRequest({
                serviceName: 'Finding',
                opType: 'findItemsByKeywords',
                appId: API_KEY,
                params: Object.assign(this.defaultParams, {keywords: keywords}),
                parser: ebay.parseResponseJson
            },
            function itemsCallback(error, itemsResponse) {
                var resItems = [];
                var totalEntries = 0;
                if (error) {
                    console.log("Sorry, something went wrong:", error);
                } else {
                    if (itemsResponse.searchResult.$.count > 0) {
                      totalEntries = itemsResponse.paginationOutput.totalEntries;
                      var items = itemsResponse.searchResult.item;
                      console.log(`***** Found ${totalEntries} items *****\n\n`);
                      for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        resItems.push({
                            title: item.title,
                            subtitle: `${item.sellingStatus.currentPrice.amount} ${item.sellingStatus.currentPrice.currencyId}`,
                            image_url: item.galleryURL,
                            buttons: [
                                {
                                    type: 'web_url',
                                    url: item.viewItemURL,
                                    title: 'View item'
                                }
                            ]
                        })
                      }  
                    } else {
                      console.log("There are no results for your search.");
                    }
                }

                options.callback(
                    { items: resItems, totalEntries: totalEntries },
                    options.sender
                );
            }
        );
    }

}

module.exports = new EbayApi();
