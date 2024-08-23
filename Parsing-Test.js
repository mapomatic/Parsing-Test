/* eslint-disable max-classes-per-file */
/* eslint-disable no-multi-assign */
// ==UserScript==
// @name         Parsing Test
// @namespace    http://tampermonkey.net/
// @version      2024.08.22.000
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/esprima@4/dist/esprima.min.js
// ==/UserScript==

/* global esprima */

(function main() {
    'use strict';

    window.esprima = esprima;

    function processNode(node, context) {
        let returnValue;
        switch (node.type) {
            case esprima.Syntax.ExpressionStatement:
                returnValue = processNode(node.expression);
                break;
            case esprima.Syntax.Literal:
                returnValue = processLiteral(node);
                break;
            case esprima.Syntax.MemberExpression:
                returnValue = processMemberExpression(node, context);
                break;
            case esprima.Syntax.BinaryExpression:
                returnValue = processBinaryExpression(node);
                break;
            case esprima.Syntax.VariableDeclaration:
                returnValue = processVariableDeclaration(node);
                break;
            case esprima.Syntax.VariableDeclarator:
                returnValue = processVariableDeclarator(node);
                break;
            case esprima.Syntax.CallExpression:
                returnValue = processCallExpression(node);
                break;
            case esprima.Syntax.AssignmentExpression:
                returnValue = processAssigmentExpression(node);
                break;
            case esprima.Syntax.Identifier:
                returnValue = processIdentifier(node, context);
                break;
            case esprima.Syntax.IfStatement:
                returnValue = processIfStatement(node);
                break;
            case esprima.Syntax.BlockStatement:
                returnValue = processBlockStatement(node);
            default:
                throw new Error(`Unexpected node type: ${node.type}`);
        }
        // if (returnValue === undefined) debugger;
        return returnValue;
    }

    let currentBlock = null;

    function processBlockStatement(node) {

    }
    function processIfStatement(node) {
        
    }
    function processLiteral(node) {
        return node.value;
    }
    function processIdentifier(node, context) {
        switch (context?.type) {
            case esprima.Syntax.BinaryExpression:
                return getTopLevelVariable(node.name);
            default:
                return node.name;
        }
    }
    function add(left, right, context) {
        return processNode(left, context) + processNode(right, context);
    }
    // function processExpressionStatement(expression) {
    //     switch (expression.type) {
    //         case esprima.Syntax.BinaryExpression:
    //             processBinaryExpression(expression);
    //             break;
    //         default:
    //             throw new Error(`Unexpected expression statement type: ${expression.type}`);
    //     }
    // }

    function getTopLevelVariable(variableName) {
        let returnValue;
        if (variables.has(variableName)) {
            returnValue = variables.get(variableName);
        }
        if (returnValue === undefined) {
            throw new Error(`Could not find top level variable: ${variableName}`);
        }
        return returnValue;
    }
    function setTopLevelVariable(variableName, value) {
        variables.set(variableName = value);
        return value;
    }
    function getMemberExpressionObject(expression) {
        let returnValue;
        switch (expression.object.type) {
            case esprima.Syntax.Identifier: {
                returnValue = getTopLevelVariable(expression.object.name);
                break;
            }
            case esprima.Syntax.MemberExpression: {
                const object = processNode(expression.object);
                returnValue = object;
                break;
            }
            default:
                throw new Error(`Unexpected member expression object type: ${expression.object.type}`);
        }
        return returnValue;
    }

    function processMemberExpression(expression) {
        const object = getMemberExpressionObject(expression);

        const propertyName = processNode(expression.property);
        if (!object.hasOwnProperty(propertyName)) {
            throw new Error(`Object does not contain this property: ${propertyName}`);
        }
        return object[propertyName];
    }
    function processBinaryExpression(expression) {
        let returnValue;
        switch (expression.operator) {
            case '+':
                returnValue = add(expression.left, expression.right, expression);
                break;
            default:
                throw new Error(`Unexpected binary expression operator: ${expression.operator}`);
        }
        if (returnValue === undefined) debugger;
        return returnValue;
    }
    function processVariableDeclaration(variableDeclaration) {
        switch (variableDeclaration.kind) {
            // TODO: handle different declaration types
            case 'let':
            case 'const':
            case 'var':
                variableDeclaration.declarations.forEach(declaration => {
                    processNode(declaration);
                });
                break;
            default:
                throw new Error(`Unexpected variable declaration kind: ${variableDeclaration.type}`);
        }
    }
    function processVariableDeclarator(declarator) {
        return (variables[processNode(declarator.id)] = processNode(declarator.init));
    }
    function processCallExpression(expression) {
        const { callee } = expression;
        const calleeObject = processNode(callee.object);
        const method = calleeObject[callee.property.name];
        if (!method) {
            throw new Error(`Method not found: ${callee.property.name}`);
        }
        return method.call(calleeObject, ...expression.arguments);
    }
    function processAssigmentExpression(expression) {
        let object;
        let returnValue;
        switch (expression.left.type) {
            case esprima.Syntax.Identifier:
                returnValue = setTopLevelVariable(expression.left.name, processNode(expression.right));
                break;
            case esprima.Syntax.MemberExpression:
                object = getMemberExpressionObject(expression.left);
                returnValue = (object[processNode(expression.left.property)] = processNode(expression.right));
                break;
            default:
                throw new Error(`Unexpected type on left side of assignment expression: ${expression.left.type}`);
        }
        return returnValue;
    }

    class Test {
        variables;

        constructor(id, code, variables, validate) {
            const defaultMapValues = [
                ['label', 'DEFAULT_LABEL'],
                ['W', { map: { getZoom: () => 34 } }]
            ];
            this.id = id;
            this.variables = new Map(...defaultMapValues, ...variables);
            this.code = code;
            this.validate = () => {
                const validated = validate(this.variables);
                if (!validated) {
                    debugger;
                }
                return validated;
            };
        }
    }
    const tests = [new Test(
        1,
        'W.map.zoom = 4',
        {},
        variables => variables.get('W').map.zoom === 4
    ), new Test(
        2,
        `let zoom = W.map.getZoom();
         if (zoom >= 2) {
            label = fieldValues.LOCALE_NAME + ' (Post Office) ' + zoom;
         }`,
        {
            fieldValues: {
                LOCALE_NAME: 'STANFORD'
            }
        },
        variables => variables.get('label') === 'STANFORD (Post Office) 34'
    )];

    const test1 = `let zoom = W.map.getZoom();
if (zoom >= 2) {
 label = fieldValues.LOCALE_NAME + ' (Post Office)';
}
if (zoom >= 5) {
 label += '\\n' + fieldValues.ADDRESS + ', ' + fieldValues.CITY + ', ' + fieldValues.STATE + ' ' + fieldValues.ZIP_CODE;
}
`;
    let variables;
    const ONLY_RUN_TEST_INDEX = -1;
    tests.forEach((test, index) => {
        try {
            test.index = index;
            if (ONLY_RUN_TEST_INDEX >= 0 && index !== ONLY_RUN_TEST_INDEX) return;
            const tree = esprima.parseScript(test.code);
            console.log(test);
            console.log(tree);
            variables = test.variables;
            let result;
            tree.body.forEach(node => {
                result = processNode(node);
            });
            console.log(`output = ${result ?? variables.get('label')}`);
            console.log(`validated = ${test.validate()}`);
        } catch (ex) {
            console.error(`Error in test "${test.id}"`, ex);
        }
    });
})();
