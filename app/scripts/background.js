'use strict';

var NewTabAppsPage = (function() {
   function NewTabAppsPage() {
      if (!(this instanceof NewTabAppsPage)) {
         return new NewTabAppsPage();
      }
   };

   // var me = this;

   /**
    * Load the Chrome apps page.
    */
   var loadAppsPage = function(tabId) {
      console.log('Loading apps page');
      chrome.tabs.update(tabId, {
         'url': 'chrome://apps/',
         'active': true,
         'highlighted': true
      }, function(tab) {});
   };

   /**
    * Add tab updated handler.
    */
   return {
      // Experimental code
      AddHandler: function addHandler() {
         chrome.tabs.onUpdated.addListener(function(newTabId, changeInfo, tab) {
            if (changeInfo.url !== 'chrome://newtab/') {
               return;
            }

            // Testing whether waiting for it to be loaded will make a difference with the address bar.
            if (changeInfo.status === 'complete') {
               loadAppsPage(newTabId);
            } else {
               console.log('Still loading. Tab ID: %s. URL: %s. Status: %s',
                  newTabId,
                  changeInfo.url,
                  changeInfo.status);

               // chrome.tabs.onUpdated.removeListener(addHandler);       
               // experimenting! this causes infinite recursion    
               setTimeout(addHandler, 1000);
            }
         });
      },
      // Original code
      Original: function() {
         chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
            if (changeInfo.url === 'chrome://newtab/') {
               loadAppsPage(tabId);
            }
         });
      }
   };

   // NewTabAppsPage.prototype.Init = function() {
   //    // Handle requests from tabs
   //    chrome.extension.onMessage.addListener(
   //       function(request, sender, sendResponse) {});
   // };
}());


// var ntap = new NewTabAppsPage();
// ntap.Init();
// ntap.addHandler();

NewTabAppsPage.AddHandler();