New Tab Apps Page
=================

A Google Chrome extension to show the apps page when opening a new tab.

# Installation

Add extension from https://chrome.google.com/webstore/detail/new-tab-apps-page/fgfnhkkcobfgplgakkclighaejoimhph

# CHANGELOG

v 0.0.??
* Restricted extension to Chrome 33 and later
* Reduced required permissions - now requires only tabs and storage (for options)
* Fixed issue in Chrome 34 which caused address bar text to be unselected.

v0.0.28
* When opening new tab, address bar remains focused so you can commence typing immediately

v0.0.10
* Initial release

**Users can stop reading here**

# TODO

1. Make sure it works with multiple windows
2. Use events to make sure if the user has already typed something, that the apps page load is cancelled. This happens when the PC is under load.
Also don't override the tab when the Restore button is present. (post crash)
3. Incorporate analytics
4. Fix packaging to include icon
5. Improve icons

# Development Environment

## Set up environment

1. cinst ruby Compass
2. npm -g install yo generator-chrome-extension
3. yo chrome-extension
4. npm update -g bower
5. bower install angular angular-route chrome-platform-analytics

## To update upstream projects

npm -g update   # updates generators, bower, etc
bower update    # updates project components