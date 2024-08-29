// name         LabelProcessor
// namespace    https://github.com/mapomatic
// version      1.0.0
// description  Converts simple text scripts into executable JS (for use with WME GIS Layers userscript)
// author       MapOMatic
// license      GNU GPLv3
// ==/UserScript==

// NOTE: The esprima library must be included to use this, e.g.:
// @require  https://cdn.jsdelivr.net/npm/esprima@4/dist/esprima.min.js

// TODO: Missing syntax:
//  ArrowFunctionExpression

// TODO: Not working:
// - Variable scope
// - Array predicate functions don't work correctly e.g. myArray.some(predicateFunction)
// - A lot of other stuff that I may never get around to...

/* eslint-disable max-classes-per-file */
/* eslint-disable no-multi-assign */

/* global esprima */

// eslint-disable-next-line no-unused-vars
class LabelProcessor {
    static DEFAULT_VARIABLES = {
        Number: window.Number,
        Math: window.Math,
        Boolean: window.Boolean,
        parseInt: window.parseInt,
        _regexReplace: {
            // Strip leading zeros or blank full label for any label starting with a non-digit or
            // is a Zero Address, use with '' as replace.
            r0: /^(0+(\s.*)?|\D.*)/,
            // Strip Everything After Street Type to end of the string by use $1 and $2 capture
            // groups, use with replace '$1$2'
            // eslint-disable-next-line max-len
            r1: /^(.* )(Ave(nue)?|Dr(ive)?|St(reet)?|C(our)?t|Cir(cle)?|Blvd|Boulevard|Pl(ace)?|Ln|Lane|Fwy|Freeway|R(oa)?d|Ter(r|race)?|Tr(ai)?l|Way|Rte \d+|Route \d+)\b.*/gi,
            // Strip SPACE 5 Digits from end of string, use with replace ''
            r2: /\s\d{5}$/,
            // Strip Everything after a "~", ",", ";" to the end of the string, use with replace ''
            r3: /(~|,|;|\s?\r\n).*$/,
            // Move the digits after the last space to before the rest of the string using, use with
            // replace '$2 $1'
            r4: /^(.*)\s(\d+).*/,
            // Insert newline between digits (including "-") and everything after the digits,
            // except(and before) a ",", use with replace '$1\n$2'
            r5: /^([-\d]+)\s+([^,]+).*/,
            // Insert newline between digits and everything after the digits, use with
            // replace '$1\n$2'
            r6: /^(\d+)\s+(.*)/
        }
    };

    static variables;

    constructor() {
        throw new SyntaxError('LabelProcessor cannot be instantiated. Example: use "LabelProcessor.process(tree, variables);"');
    }

    static parseLabelScript(script) {
        return esprima.parseScript(`function __$lp(){${script}}`);
    }

    path = [];
    static process(esTree, globalVariables) {
        this.variables = { ...LabelProcessor.DEFAULT_VARIABLES, ...globalVariables };
        this.path = [];
        return { output: this.processNode(esTree), variables: this.variables };
    }

    static processNode(node, context) {
        this.path.push(node);
        let returnValue;
        switch (node.type) {
            case esprima.Syntax.Program:
                returnValue = this.processProgram(node);
                break;
            case esprima.Syntax.ExpressionStatement:
                returnValue = this.processNode(node.expression);
                break;
            case esprima.Syntax.Literal:
                returnValue = LabelProcessor.processLiteral(node);
                break;
            case esprima.Syntax.MemberExpression:
                returnValue = this.processMemberExpression(node, context);
                break;
            case esprima.Syntax.BinaryExpression:
                returnValue = this.processBinaryExpression(node);
                break;
            case esprima.Syntax.VariableDeclaration:
                returnValue = this.processVariableDeclaration(node);
                break;
            case esprima.Syntax.VariableDeclarator:
                returnValue = this.processVariableDeclarator(node);
                break;
            case esprima.Syntax.CallExpression:
                returnValue = this.processCallExpression(node);
                break;
            case esprima.Syntax.AssignmentExpression:
                returnValue = this.processAssigmentExpression(node);
                break;
            case esprima.Syntax.Identifier:
                returnValue = this.processIdentifier(node, context);
                break;
            case esprima.Syntax.IfStatement:
                returnValue = this.processIfStatement(node);
                break;
            case esprima.Syntax.BlockStatement:
                returnValue = this.processBlockStatement(node);
                break;
            case esprima.Syntax.EmptyStatement:
                // do nothing;
                break;
            case esprima.Syntax.TemplateLiteral:
                returnValue = this.processTemplateLiteral(node);
                break;
            case esprima.Syntax.NewExpression:
                returnValue = this.processNewExpression(node);
                break;
            case esprima.Syntax.FunctionDeclaration:
                returnValue = this.processFunctionDeclaration(node);
                break;
            case esprima.Syntax.ReturnStatement:
                returnValue = this.processReturnStatement(node);
                break;
            case esprima.Syntax.LogicalExpression:
                returnValue = this.processLogicalExpression(node);
                break;
            case esprima.Syntax.UnaryExpression:
                returnValue = this.processUnaryExpression(node);
                break;
            case esprima.Syntax.ArrayExpression:
                returnValue = this.processArrayExpression(node);
                break;
            case esprima.Syntax.ConditionalExpression:
                returnValue = this.processConditionalExpression(node);
                break;
            case esprima.Syntax.ObjectExpression:
                returnValue = this.processObjectExpression(node);
                break;
            case esprima.Syntax.ArrowFunctionExpression:
                returnValue = this.processArrowFunctionExpression(node);
                break;
            default:
                throw new SyntaxError(`Unexpected node type: ${node.type}`);
        }
        this.path.pop();
        return returnValue;
    }

    static processObjectExpression(node) {
        const returnValue = {};
        node.properties.forEach(property => {
            returnValue[property.key.name] = this.processNode(property.value, node);
        });
        return returnValue;
    }

    static processConditionalExpression(node) {
        const returnValue = this.processNode(node.test) ? this.processNode(node.consequent) : this.processNode(node.alternate);
        return returnValue;
    }

    static processArrayExpression(node) {
        const returnValue = node.elements.map(element => this.processNode(element));
        return returnValue;
    }

    static processUnaryExpression(node) {
        let returnValue;
        switch (node.operator) {
            case '!':
                returnValue = !this.processNode(node.argument, node);
                break;
            default:
                throw new SyntaxError(`Unexpected unary expression operator: ${node.operator}`);
        }
        return returnValue;
    }

    static processLogicalExpression(node) {
        let returnValue;
        switch (node.operator) {
            case '&&':
                returnValue = this.processNode(node.left, node) && this.processNode(node.right, node);
                break;
            case '||':
                returnValue = this.processNode(node.left, node) || this.processNode(node.right, node);
                break;
            default:
                throw new SyntaxError(`Unexpected logical expression operator: ${node.operator}`);
        }
        return returnValue;
    }

    static processReturnStatement(node) {
        let returnValue;
        switch (node.argument.type) {
            case esprima.Syntax.Identifier:
                returnValue = this.getTopLevelVariable(this.processNode(node.argument));
                break;
            default:
                returnValue = this.processNode(node.argument);
        }
        node.returnCalled = true;
        return returnValue;
    }

    static processArrowFunctionExpression() {
        throw new SyntaxError('Arrow functions are not supported yet.');
    }

    static processFunctionDeclaration(node) {
        const name = this.processNode(node.id);
        if (this.variables.hasOwnProperty(name)) {
            throw new SyntaxError(`Invalid function declaration. Identifier ${name} has already been declared`);
        }
        // TODO: Parameters are stored as global variables. This could be improved.
        node.params.forEach(param => {
            const paramName = this.processNode(param);
            if (this.variables.hasOwnProperty(paramName)) {
                throw new SyntaxError(`Function "${name}" uses parameter name "${paramName}" that's already declared.`);
            }
            this.setTopLevelVariable(paramName, undefined);
        });
        return (this.variables[name] = (...args) => {
            args.forEach((arg, i) => {
                this.setTopLevelVariable(node.params[i].name, args[i]);
            });
            const returnValue = this.processNode(node.body);
            return returnValue;
        });
    }

    static processProgram(node) {
        this.processNode(node.body[0]);
        return this.variables.__$lp();
    }

    static processNewExpression(node) {
        const args = node.arguments.map(argument => this.processNode(argument));
        return Reflect.construct(window[this.processNode(node.callee)], args);
    }

    static processTemplateLiteral(node) {
        const values = node.expressions.map(expression => this.processNode(expression));
        let nextValueIndex = 0;
        let returnValue = '';
        node.quasis.forEach(quasi => {
            if (!quasi.value.raw.length) {
                returnValue += values[nextValueIndex];
                nextValueIndex++;
            } else {
                returnValue += quasi.value.cooked;
            }
        });
        return returnValue;
    }

    static processBlockStatement(node) {
        let returnValue;
        for (let i = 0; i < node.body.length; i++) {
            const childNode = node.body[i];
            returnValue = this.processNode(childNode);
            if (childNode.returnCalled) {
                node.returnCalled = true;
                break;
            }
        }
        return returnValue;
    }

    static processIfStatement(node) {
        let returnValue;
        let test;
        if (node.test.type === esprima.Syntax.Identifier) {
            test = this.getTopLevelVariable(node.test.name);
        } else {
            test = this.processNode(node.test);
        }
        if (test) {
            returnValue = this.processNode(node.consequent);
            if (node.consequent.returnCalled) {
                node.returnCalled = true;
            }
        }
        return returnValue;
    }

    static isNumeric(str) {
        if (typeof str !== 'string') return false; // we only process strings!
        return !isNaN(str) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               && !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
    }

    static processLiteral(node) {
        return node.value;
    }

    static processIdentifier(node, context) {
        switch (context?.type) {
            case esprima.Syntax.BinaryExpression:
            case esprima.Syntax.LogicalExpression:
            case esprima.Syntax.VariableDeclarator:
            case esprima.Syntax.ObjectExpression:
            case esprima.Syntax.CallExpression:
                return this.getTopLevelVariable(node.name);
            default:
                return node.name;
        }
    }

    static add(left, right, context) {
        return this.processNode(left, context) + this.processNode(right, context);
    }

    static subtract(left, right, context) {
        return this.processNode(left, context) - this.processNode(right, context);
    }

    static multiply(left, right, context) {
        return this.processNode(left, context) * this.processNode(right, context);
    }

    static divide(left, right, context) {
        return this.processNode(left, context) / this.processNode(right, context);
    }

    static greaterThanOrEqual(left, right, context) {
        return this.processNode(left, context) >= this.processNode(right, context);
    }

    static lessThanOrEqual(left, right, context) {
        return this.processNode(left, context) <= this.processNode(right, context);
    }

    static notEqual(left, right, context) {
        // eslint-disable-next-line eqeqeq
        return this.processNode(left, context) != this.processNode(right, context);
    }

    static notEqualEqual(left, right, context) {
        return this.processNode(left, context) !== this.processNode(right, context);
    }

    static getTopLevelVariable(variableName) {
        let returnValue;
        if (this.variables.hasOwnProperty(variableName)) {
            returnValue = this.variables[variableName];
        }
        // TODO: Find a preprocessor to remove test code like this.
        if (returnValue === undefined) {
            console.warn(`Variabe is undefined: ${variableName}`);
        }
        return returnValue;
    }

    static setTopLevelVariable(variableName, value) {
        this.variables[variableName] = value;
        return value;
    }

    static getMemberExpressionObject(expression) {
        let returnValue;
        switch (expression.object.type) {
            case esprima.Syntax.Identifier: {
                returnValue = this.getTopLevelVariable(expression.object.name);
                break;
            }
            case esprima.Syntax.CallExpression:
            case esprima.Syntax.MemberExpression: {
                const object = this.processNode(expression.object);
                returnValue = object;
                break;
            }
            default:
                throw new SyntaxError(`Unexpected member expression object type: ${expression.object.type}`);
        }
        return returnValue;
    }

    static processMemberExpression(expression) {
        const object = this.getMemberExpressionObject(expression);

        const propertyName = this.processNode(expression.property);
        if (!object.hasOwnProperty(propertyName)) {
            console.warn(`Object does not contain this property: ${propertyName}`);
        }
        return object[propertyName];
    }

    static processBinaryExpression(expression) {
        let returnValue;
        switch (expression.operator) {
            case '+':
                returnValue = this.add(expression.left, expression.right, expression);
                break;
            case '-':
                returnValue = this.subtract(expression.left, expression.right, expression);
                break;
            case '*':
                returnValue = this.multiply(expression.left, expression.right, expression);
                break;
            case '/':
                returnValue = this.divide(expression.left, expression.right, expression);
                break;
            case '>=':
                returnValue = this.greaterThanOrEqual(expression.left, expression.right, expression);
                break;
            case '<=':
                returnValue = this.lessThanOrEqual(expression.left, expression.right, expression);
                break;
            case '!=':
                returnValue = this.notEqual(expression.left, expression.right, expression);
                break;
            case '!==':
                returnValue = this.notEqualEqual(expression.left, expression.right, expression);
                break;
            case '??':
                throw new SyntaxError('The null coalescing operator (??) is not supported by the label processing engine.');
            default:
                throw new SyntaxError(`Unexpected binary expression operator: ${expression.operator}`);
        }
        return returnValue;
    }

    static processVariableDeclaration(variableDeclaration) {
        switch (variableDeclaration.kind) {
            // TODO: handle different declaration types
            case 'let':
            case 'const':
            case 'var':
                variableDeclaration.declarations.forEach(declaration => {
                    this.processNode(declaration);
                });
                break;
            default:
                throw new SyntaxError(`Unexpected variable declaration kind: ${variableDeclaration.type}`);
        }
    }

    static processVariableDeclarator(node) {
        const name = this.processNode(node.id);
        if (this.variables.hasOwnProperty(name)) {
            throw new SyntaxError(`Invalid function declaration. Identifier ${name} has already been declared.`);
        }
        return (this.variables[name] = node.init ? this.processNode(node.init, node) : undefined);
    }

    static processCallExpression(expression) {
        const { callee } = expression;
        let methodToCall;
        let calleeObject;
        switch (callee.type) {
            case esprima.Syntax.MemberExpression: {
                if (callee.object.type === esprima.Syntax.Identifier) {
                    calleeObject = this.getTopLevelVariable(callee.object.name);
                } else {
                    calleeObject = this.processNode(callee.object);
                }
                methodToCall = calleeObject[callee.property.name];
                if (!methodToCall) {
                    throw new SyntaxError(`Method not found: ${callee.property.name}`);
                }
                break;
            }
            case esprima.Syntax.Identifier:
                calleeObject = null;
                methodToCall = this.getTopLevelVariable(callee.name);
                break;
            default:
                throw new SyntaxError(`Unexpected callee type in call expression: ${callee.type}`);
        }
        const args = expression.arguments.map(arg => this.processNode(arg, expression));
        const returnValue = methodToCall.call(calleeObject, ...args);
        return returnValue;
    }

    static equals(left, right) {
        let returnValue;
        switch (left.type) {
            case esprima.Syntax.Identifier:
                returnValue = this.setTopLevelVariable(left.name, this.processNode(right));
                break;
            case esprima.Syntax.MemberExpression: {
                const object = this.getMemberExpressionObject(left);
                returnValue = (object[this.processNode(left.property)] = this.processNode(right));
                break;
            }
            default:
                throw new SyntaxError(`Unexpected type on left side of assignment expression: ${left.type}`);
        }
        return returnValue;
    }

    static plusEquals(left, right) {
        let returnValue;
        let leftValue;
        switch (left.type) {
            case esprima.Syntax.Identifier: {
                leftValue = this.getTopLevelVariable(left.name);
                returnValue = this.setTopLevelVariable(left.name, leftValue + this.processNode(right));
                break;
            }
            case esprima.Syntax.MemberExpression: {
                const object = this.getMemberExpressionObject(left);
                const propertyName = this.processNode(left.property);
                leftValue = object[propertyName];
                returnValue = (object[propertyName] = leftValue + this.processNode(right));
                break;
            }
            default:
                throw new SyntaxError(`Unexpected type on left side of assignment expression: ${left.type}`);
        }
        return returnValue;
    }

    static processAssigmentExpression(expression) {
        let returnValue;
        switch (expression.operator) {
            case '=':
                returnValue = this.equals(expression.left, expression.right);
                break;
            case '+=':
                returnValue = this.plusEquals(expression.left, expression.right);
                break;
            default:
                throw new SyntaxError(`Unexpected assigment expression operator: ${expression.operator}`);
        }
        return returnValue;
    }
}
