// ==UserScript==
// @name         Parsing Test
// @namespace    http://tampermonkey.net/
// @version      2024.08.22.000
// @description  try to take over the world!
// @author       You
// @match         *://*.google.com*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/esprima@4/dist/esprima.min.js
// ==/UserScript==

/* global esprima */

(function main() {
    'use strict';

    var test = "fieldValues.ARPT_NAME + ' ' + '(' + (fieldValues.NOTAM_ID) + ')';'";

    window.esprima = esprima;

    const variables = {
        label: 'DEFAULT LABEL',
        fieldValues: {
            ARRPT_NAME: 'TEST NAME',
            NOTAM_ID: '45'
        }
    };
    const tree = esprima.parseScript(test);
    tree.body.forEach(node => {
        processNode(node, variables);
    });

    function processNode(node, variables) {
        switch (node.type) {
            case esprima.Syntax.ExpressionStatement:

                break;
            default:
        }
    }

    function add(left, right) {
        return processNode(left) + processNode(right);
    }
    function processExpressionStatement(expression) {
        switch case(expression.type) {
            case esprima.Syntax.BinaryExpression:
                if (expression.operator === '+') {
                    return add(node.expression.left, node.expression.right);
                }
        }

    }
})();
