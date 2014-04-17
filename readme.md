# Set up environment

1. cinst ruby Compass
2. npm -g install yo generator-chrome-extension
3. yo chrome-extension
4. npm update -g bower
5. bower install angular angular-route chrome-platform-analytics

# TODO

1. Make sure it works with multiple windows
2. Incorporate analytics
3. Fix packaging to include icon
4. Improve icons


# CHANGELOG

v 0.0.77
* Restricted extension to Chrome 33 and later
* Reduced required permissions - now requires only tabs and storage (for options)
* Fixed issue in Chrome 34 which caused address bar text to be unselected.

v0.0.28
* When opening new tab, address bar remains focused so you can commence typing immediately

v0.0.10
* Initial release