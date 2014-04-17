'use strict';

function NewTabAppsPage() {

   if (!(this instanceof NewTabAppsPage))
      return new NewTabAppsPage();

   var me = this;

   this.a = 'a';

   /**
    * Load the Chrome apps page.
    */
   this.loadAppsPage = function loadAppsPage(tabId) {
      console.log('Loading apps page');
      chrome.tabs.update(tabId, {
         'url': 'chrome://apps/',
         'active': true,
         'highlighted': true
      }, function(tab) {
         // chrome.tabs.reload(newTabId);
      });
   }
}

/**
 * Add tab updated handler.
 */
NewTabAppsPage.prototype.AddHandler = function addHandler() {
   chrome.tabs.onUpdated.addListener(function(newTabId, changeInfo) {
      if (changeInfo.url === 'chrome://newtab/') {

         // Testing whether waiting for it to be loaded will make a difference with the address bar.
         if (changeInfo.status === 'loading') { //'complete') {
            loadAppsPage(newTabId);
         } else {
            console.log('Still loading. Tab ID: %s. URL: %s. Status: %s',
               newTabId,
               changeInfo.url,
               changeInfo.status);

            chrome.tabs.onUpdated.removeListener(function() {
               addHandler();
            });
         }
      }
   });
}

NewTabAppsPage.prototype.Original = function original() {
   chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
      if (changeInfo.url === 'chrome://newtab/') {

         chrome.tabs.remove(tabId, function() {
            chrome.tabs.create({
               'url': 'chrome://apps/',
               'active': true
            }, function(tab) {
               chrome.tabs.highlight({
                  tabs: tab.id
               })
            });
         });
      }
   });
}

NewTabAppsPage.prototype.Init = function() {
   // Handle requests from tabs
   chrome.extension.onMessage.addListener(
      function(request, sender, sendResponse) {});
}


var ntap = new NewTabAppsPage();
ntap.Init();
ntap.Original();