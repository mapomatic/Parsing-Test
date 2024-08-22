// ==UserScript==
// @name         Parsing Test
// @namespace    http://tampermonkey.net/
// @version      2024.08.22.000
// @description  try to take over the world!
// @author       You
// @match         *://*.waze.com/*editor*
// @exclude       *://*.waze.com/user/editor*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/esprima@4.0.1/dist/esprima.min.js
// ==/UserScript==

/* global esprima */

(function main() {
    'use strict';

    window.esprima = esprima;
})();
