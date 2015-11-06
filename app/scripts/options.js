/* global chrome */
'use strict';

angular.module('options', ['ngRoute', 'ngAnimate'])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'options.html',
          controller: 'OptionsCtrl',
          controllerAs: 'options'
        });
 
      // configure html5 to get links working on jsfiddle
      $locationProvider.html5Mode(true);
    }])
  .controller('MainCtrl', ['$route', '$routeParams', '$location',
    function ($route, $routeParams, $location) {
      this.$route = $route;
      this.$location = $location;
      this.$routeParams = $routeParams;
    }]);

function NewTabAppsPageOptions() {

  if (!(this instanceof NewTabAppsPageOptions)) {
    return new NewTabAppsPageOptions();
  }

  var me = this;

  this.availableOptions = ['focusOnAddressBar'];

  this.options = {};

  function load() {
    // Load all options
    chrome.storage.sync.get(this.availableOptions, function (items) {
      this.options = items;
      console.log(me.options);
    });

    // Register for changes - update local copy if changed
    chrome.storage.onChanged.addListener(function (changes, namespace) {
      for (var key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
          'Old value was "%s", new value is "%s".',
          key,
          namespace,
          storageChange.oldValue,
          storageChange.newValue);

        this.options[key] = storageChange.newValue;
      }
    });
  }

  /**
   * Load the Chrome apps page.
   */
  this.saveOption = function saveOption(key, val) {
    if (!val) {
      //message('Error: No value specified for %s', key);
      return;
    }

    // Is this necessary? Will get picked up by event handler.
    this.options[key] = val;

    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({
      key: val
    }, function () {
      // Notify that we saved.
      //message('Settings saved for %s', key);
    });
  };

  load();
}
