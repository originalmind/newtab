'use strict';

/**
 * NewTabAppsPage
 * Attach to the tab events and redirect chrome://newtab to chrome://apps
 */
var NewTabAppsPage = (function() {
   function NewTabAppsPage() {
      if (!(this instanceof NewTabAppsPage)) {
         return new NewTabAppsPage();
      }
   };

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

         chrome.tabs.onCreated.addListener(function(tab) {
            console.log('created')
            console.log(tab);
            if (tab.url === 'chrome://newtab/') {
               loadAppsPage(tab.id);
            }
         });

         chrome.tabs.onUpdated.addListener(function(newTabId, changeInfo, tab) {
            console.log('updated')
            console.log(changeInfo)
            console.log(tab)

            if (changeInfo.url !== 'chrome://newtab/') {
               return;
            }

            loadAppsPage(newTabId);
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
}());

NewTabAppsPage.AddHandler();