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
   }

   var logEnabled = false;
   var startingUp = false;

   /**
    * Load the Chrome apps page.
    */
   var loadAppsPage = function(tabId) {
      log('Loading apps page');
      chrome.tabs.update(tabId, {
         'url': 'chrome://apps/',
         'active': true,
         'highlighted': true
      }, function(tab) {});
   };

   var log = function(message) {
      if (logEnabled) { console.log(message); }
   };

   var checkForRestore = function() {
      chrome.sessions.getRecentlyClosed( null, function(sessions) {
         log('Recently closed sessions');
         log(sessions);

         if (sessions) {
            sessions.forEach(function(session) {
               // After a crash, the last session seems to have a lastModified value of 0
               if (session.window && session.lastModified === 0) {
                  log('Restoring session ' + session.window.sessionId + 
                     ' with ' + session.window.tabs.length + ' tabs and last modified: ' + session.lastModified);
                  chrome.sessions.restore(session.window.sessionId);
               }
            });
         }
      });
   };

   /**
    * Add tab updated handler.
    */
   return {
      
      Init: function() {

         log('Init');

         // chrome.management.onEnabled.addListener(function(extensionInfo) {
         //    log('Extension enabled');
         //    log(extensionInfo);
         // });

         chrome.runtime.onStartup.addListener(function() {
            log('On startup');
            startingUp = true;
         });

         // Fires when recently closed windows/tabs are changed
         chrome.sessions.onChanged.addListener(function() {
            log('Session changed');

            checkForRestore();
            startingUp = false;
         });

         chrome.tabs.onCreated.addListener(function(tab) {
            log('Tab created');
            log(tab);

            if (startingUp) {
               log('Session changing - won\'t load apps page');
               return;
            }

            if (tab.url === 'chrome://newtab/') {
               loadAppsPage(tab.id);
            }
         });

         chrome.tabs.onUpdated.addListener(function(newTabId, changeInfo, tab) {
            log('Tab updated');
            log(changeInfo);
            log(tab);

            if (startingUp) {
               log('Session changing - won\'t load apps page');
               return;
            }

            if (changeInfo.url === 'chrome://newtab/') {
               loadAppsPage(newTabId);
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
}());

NewTabAppsPage.Init();