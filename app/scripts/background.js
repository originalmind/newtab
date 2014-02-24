'use strict';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
	if (changeInfo.url === 'chrome://newtab/') {
		
		chrome.tabs.remove(tabId);
		
		chrome.tabs.create({
			'url': 'chrome://apps/'
		}, function(tab) {
			chrome.tabs.executeScript(tab.id, {
				'code': 'focusNewTab()'
			})
		});
	}
});
