'use strict';

function focusNewTab() {

    console.log('focusNewTab');

    var k = 9;

    var oEvent = document.createEvent('KeyboardEvent');

    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
        get: function () {
            return this.keyCodeVal;
        }
    });
    Object.defineProperty(oEvent, 'which', {
        get: function () {
            return this.keyCodeVal;
        }
    });

    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent('keydown', true, true, document.defaultView, false, false, false, false, k, k);
    } else {
        oEvent.initKeyEvent('keydown', true, true, document.defaultView, false, false, false, false, k, 0);
    }

    oEvent.keyCodeVal = k;

    if (oEvent.keyCode !== k) {
        console.log('keyCode mismatch ' + oEvent.keyCode + '(' + oEvent.which + ')');
    }

    document.dispatchEvent(oEvent);
}
