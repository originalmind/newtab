'use strict';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
	if (changeInfo.url === 'chrome://newtab/') {
		
		chrome.tabs.update(tabId, {
			'url': 'chrome://apps/',
			'active': true
		});
	}
});
