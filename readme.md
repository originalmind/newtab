New Tab Apps Page
=================

A Google Chrome extension to show the apps page when opening a new tab.

# Installation

Add extension from https://chrome.google.com/webstore/detail/new-tab-apps-page/fgfnhkkcobfgplgakkclighaejoimhph

# CHANGELOG

v1.1.x

* Improving crash handling

v1.1.10

* Handle browser crash - automatically restore tabs from crashed session
* Removed console logging

v1.0.3

* Updated app icon
* Add short_name to manifest

v1.0.0

* Improved load speed of Apps page
* Restricted extension to Chrome 33 and later
* Reduced required permissions - now requires only tabs and storage (for options)
* Fixed issue in Chrome 34 which caused address bar text to be unselected.

v0.0.28

* When opening new tab, address bar remains focused so you can commence typing immediately

v0.0.10

* Initial release


----------------------------------------------------------------
**Non-developers can stop reading here**
----------------------------------------------------------------

# Development Environment

## Windows dev environment set up (requires Chocolatey)

1. Powershell: iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))
3. cinst nodejs ruby Compass git -y
4. npm -g install yo generator-chrome-extension bower
5. yo chrome-extension
6. npm update -g bower
7. bower install angular angular-route chrome-platform-analytics --save

## To update upstream projects

* npm -g update npm # update npm
* npm -g update   	# updates Yeoman generators, bower, etc
* npm update      	# updates project components (mainly grunt)
* bower update    	# updates project front-end components, e.g. angular

# TODO

1. Use events to make sure if the user has already typed something, that the apps page load is cancelled. This happens when the PC is under load.
