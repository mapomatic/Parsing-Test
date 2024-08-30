/* eslint-disable eqeqeq */
// name         LabelProcessor
// namespace    https://github.com/mapomatic
// version      1.0.0
// description  Converts simple text scripts into executable JS (for use with WME GIS Layers userscript)
// author       MapOMatic
// license      GNU GPLv3
// ==/UserScript==

// NOTE: The esprima-next library is required to use this.

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
class VariableContainer {
    static currentScope;
    static scopeHistory = [];
    static debug = false;

    static ScopeType = {
        Global: 'Global',
        Function: 'Function',
        Block: 'Block'
    };

    static VariableType = {
        Let: 'Let',
        Const: 'Const',
        Var: 'Var'
    };

    constructor() {
        throw new SyntaxError('Cannot call new on the Scope class.');
    }

    static reset() {
        this.scopeHistory = [];
        this.currentScope = undefined;
    }

    /**
     *
     * @param {ScopeType} type
     */
    static addScope(type) {
        const scope = {
            parentScope: this.currentScope,
            v: {},
            type
        };
        this.currentScope = scope;
    }

    static removeCurrentScope() {
        if (this.debug) {
            this.scopeHistory.push(this.currentScope);
        }
        this.currentScope = this.currentScope.parentScope;
    }

    /**
     *
     * @param {VariableType} type
     * @param {string} name
     * @param {*} value
     */
    static declare(type, name, value = undefined) {
        this.checkAlreadyDeclared(name, type);
        switch (type) {
            case this.VariableType.Let:
                this.currentScope.v[name] = { type, value };
                break;
            case this.VariableType.Const:
                this.currentScope.v[name] = { type, value };
                break;
            case this.VariableType.Var: {
                let scope = this.currentScope;
                while (scope) {
                    if (scope.type === this.ScopeType.Function || scope.type === this.ScopeType.Global) {
                        scope.v[name] = { type, value };
                        scope = undefined;
                    } else {
                        scope = scope.parentScope;
                    }
                }
                break;
            }
            default:
                throw new SyntaxError(`Unexpected variable declaration type: ${type}`);
        }
    }

    static setValue(name, value) {
        const reference = this.getReference(name, true);
        if (!reference) {
            throw new ReferenceError(`${name} is not defined.`);
        }
        if (reference.type === this.VariableType.Const) {
            throw new TypeError(`Assignment to constant variable: ${name}`);
        }
        return (reference.value = value);
    }

    static getValue(name) {
        const reference = this.getReference(name);
        return reference?.value;
    }

    static getReference(name) {
        let scope = this.currentScope;
        while (scope) {
            if (scope.v.hasOwnProperty(name)) {
                return scope.v[name];
            }
            if (scope.type === this.ScopeType.Global) {
                scope = undefined;
            } else {
                scope = scope.parentScope;
            }
        }
        return undefined;
    }

    static checkAlreadyDeclared(name, type) {
        let scope = this.currentScope;
        while (scope) {
            if (scope.v.hasOwnProperty(name)) {
                if (type === this.VariableType.Const || type === this.VariableType.Let
                    || scope.v[name].type !== this.VariableType.Var) {
                    throw new SyntaxError(`Identifier '${name}' has already been declared`);
                }
            }
            if (scope.type === this.ScopeType.Function || scope.type === this.ScopeType.Global) {
                scope = undefined;
            } else {
                scope = scope.parentScope;
            }
        }
    }
}

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

    static scopePath = [];

    constructor() {
        throw new SyntaxError('LabelProcessor cannot be instantiated. Example: use "LabelProcessor.process(tree, variables);"');
    }

    static parseLabelScript(script) {
        return esprima.parseScript(`function __$lp(){${script}} __$lp()`);
    }

    path = [];
    static process(esTree, globalVariables) {
        this.globalVariables = { ...LabelProcessor.DEFAULT_VARIABLES, ...globalVariables };
        this.path = [];
        VariableContainer.reset();
        return { output: this.processNode(esTree), variables: this.globalVariables };
    }

    static processNode(node, context) {
        this.path.push(node);
        let returnValue;
        switch (node.type) {
            case esprima.Syntax.Program:
                VariableContainer.addScope(VariableContainer.ScopeType.Global);
                // Add global variables
                Object.keys(this.globalVariables).forEach(key => {
                    VariableContainer.declare(VariableContainer.VariableType.Let, key, this.globalVariables[key]);
                });
                returnValue = this.processProgram(node);
                VariableContainer.removeCurrentScope();
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
                returnValue = this.processVariableDeclarator(node, context);
                break;
            case esprima.Syntax.CallExpression:
                returnValue = this.processCallExpression(node, context);
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
                VariableContainer.addScope(VariableContainer.ScopeType.Block);
                returnValue = this.processBlockStatement(node);
                VariableContainer.removeCurrentScope();
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
            case esprima.Syntax.ChainExpression:
                returnValue = this.processChainExpression(node);
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
            case '??':
                returnValue = this.processNode(node.left, node) ?? this.processNode(node.right, node);
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
                returnValue = VariableContainer.getValue(node.argument.name);
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

    static processChainExpression(node) {
        return this.processNode(node.expression, node);
    }

    static processFunctionDeclaration(node) {
        return VariableContainer.declare(VariableContainer.VariableType.Var, this.processNode(node.id), node);
    }

    static processProgram(node) {
        let returnValue;
        node.body.forEach(childNode => {
            returnValue = this.processNode(childNode);
        });
        return returnValue;
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
            test = VariableContainer.getValue(node.test.name);
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
            case esprima.Syntax.AssignmentExpression:
            case esprima.Syntax.BinaryExpression:
            case esprima.Syntax.LogicalExpression:
            case esprima.Syntax.VariableDeclarator:
            case esprima.Syntax.ObjectExpression:
            case esprima.Syntax.CallExpression:
                return VariableContainer.getValue(node.name);
            default:
                return node.name;
        }
    }

    static getMemberExpressionObject(expression) {
        let returnValue;
        switch (expression.object.type) {
            case esprima.Syntax.Identifier: {
                returnValue = VariableContainer.getValue(expression.object.name);
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

    static doBinaryExpression(node, func) {
        return func(this.processNode(node.left, node), this.processNode(node.right, node));
    }

    static add(left, right) {
        return left + right;
    }

    static subtract(left, right) {
        return left - right;
    }

    static multiply(left, right) {
        return left * right;
    }

    static divide(left, right) {
        return left / right;
    }

    static mod(left, right) {
        return left % right;
    }

    static power(left, right) {
        return left ** right;
    }

    static processBinaryExpression(expression) {
        let returnValue;
        switch (expression.operator) {
            case '+':
                returnValue = this.doBinaryExpression(expression, this.add);
                break;
            case '-':
                returnValue = this.doBinaryExpression(expression, this.subtract);
                break;
            case '*':
                returnValue = this.doBinaryExpression(expression, this.multiply);
                break;
            case '/':
                returnValue = this.doBinaryExpression(expression, this.divide);
                break;
            case '%':
                returnValue = this.doBinaryExpression(expression, this.mod);
                break;
            case '**':
                returnValue = this.doBinaryExpression(expression, this.power);
                break;
            case '==':
                returnValue = this.doBinaryExpression(expression, (left, right) => left == right);
                break;
            case '===':
                returnValue = this.doBinaryExpression(expression, (left, right) => left === right);
                break;
            case '>=':
                returnValue = this.doBinaryExpression(expression, (left, right) => left >= right);
                break;
            case '<=':
                returnValue = this.doBinaryExpression(expression, (left, right) => left <= right);
                break;
            case '!=':
                returnValue = this.doBinaryExpression(expression, (left, right) => left != right);
                break;
            case '!==':
                returnValue = this.doBinaryExpression(expression, (left, right) => left !== right);
                break;
            default:
                throw new SyntaxError(`Unexpected binary expression operator: ${expression.operator}`);
        }
        return returnValue;
    }

    static processVariableDeclaration(node) {
        switch (node.kind) {
            // TODO: handle different declaration types
            case 'let':
            case 'const':
            case 'var':
                node.declarations.forEach(declaration => {
                    this.processNode(declaration, node);
                });
                break;
            default:
                throw new SyntaxError(`Unexpected variable declaration kind: ${node.type}`);
        }
    }

    static processVariableDeclarator(node, context) {
        const name = this.processNode(node.id);
        const value = node.init ? this.processNode(node.init, node) : undefined;
        let declarationType;
        switch (context.kind) {
            case 'let':
                declarationType = VariableContainer.VariableType.Let;
                break;
            case 'const':
                declarationType = VariableContainer.VariableType.Const;
                break;
            case 'var':
                declarationType = VariableContainer.VariableType.Var;
                break;
            default:
                throw new TypeError(`Unexpected variable declaration kind: ${context.kind}`);
        }
        VariableContainer.declare(declarationType, name, value);
    }

    static processCallExpression(node, context) {
        const { callee } = node;
        let returnValue;
        let methodToCall;
        let calleeObject;
        switch (callee.type) {
            case esprima.Syntax.MemberExpression: {
                if (callee.object.type === esprima.Syntax.Identifier) {
                    calleeObject = this.processNode(callee.object, node);
                } else {
                    calleeObject = this.processNode(callee.object);
                }
                methodToCall = calleeObject[callee.property.name];
                if (!methodToCall) {
                    if (context && context.type === esprima.Syntax.ChainExpression) {
                        return undefined;
                    }
                    throw new SyntaxError(`Method not found: ${callee.property.name}`);
                }
                break;
            }
            case esprima.Syntax.Identifier:
                methodToCall = this.processNode(callee, node);
                break;
            default:
                throw new SyntaxError(`Unexpected callee type in call expression: ${callee.type}`);
        }
        if (methodToCall.type === esprima.Syntax.FunctionDeclaration) {
            VariableContainer.addScope(VariableContainer.ScopeType.Function);
            for (let i = 0; i < Math.min(node.arguments.length, methodToCall.params.length); i++) {
                VariableContainer.declare(VariableContainer.VariableType.Var, methodToCall.params[i], this.processNode(node.arguments[i], node));
            }
            returnValue = this.processNode(methodToCall.body);
            VariableContainer.removeCurrentScope();
        } else {
            const args = node.arguments.map(arg => this.processNode(arg, node));
            returnValue = methodToCall.call(calleeObject, ...args);
        }
        // const args = expression.arguments.map(arg => this.processNode(arg, expression));
        // const returnValue = methodToCall.call(calleeObject, ...args);
        return returnValue;
    }

    static equals(left, right) {
        let returnValue;
        switch (left.type) {
            case esprima.Syntax.Identifier:
                returnValue = VariableContainer.setValue(left.name, this.processNode(right));
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

    static doAssignmentExpression(node, func) {
        let returnValue;
        let leftValue;
        switch (node.left.type) {
            case esprima.Syntax.Identifier: {
                leftValue = VariableContainer.getValue(node.left.name);
                returnValue = VariableContainer.setValue(node.left.name, func(leftValue, this.processNode(node.right, node)));
                break;
            }
            case esprima.Syntax.MemberExpression: {
                const object = this.getMemberExpressionObject(node.left);
                const propertyName = this.processNode(node.left.property);
                leftValue = object[propertyName];
                returnValue = (object[propertyName] = func(leftValue, this.processNode(node.right, node)));
                break;
            }
            default:
                throw new SyntaxError(`Unexpected type on left side of assignment expression: ${node.left.type}`);
        }
        return returnValue;
    }

    /** This is not supported by the v4 of the esprima parser */
    static nullishCoalesce(left, right) {
        return left ?? right;
    }

    static or(left, right) {
        return left || right;
    }

    static and(left, right) {
        return left && right;
    }

    static processAssigmentExpression(node) {
        let returnValue;
        switch (node.operator) {
            case '=':
                returnValue = this.equals(node.left, node.right, node);
                break;
            case '+=':
                returnValue = this.doAssignmentExpression(node, this.add);
                break;
            case '-=':
                returnValue = this.doAssignmentExpression(node, this.subtract);
                break;
            case '*=':
                returnValue = this.doAssignmentExpression(node, this.multiply);
                break;
            case '/=':
                returnValue = this.doAssignmentExpression(node, this.divide);
                break;
            case '%=':
                returnValue = this.doAssignmentExpression(node, this.mod);
                break;
            case '**=':
                returnValue = this.doAssignmentExpression(node, this.power);
                break;
            case '??=':
                returnValue = this.doAssignmentExpression(node, this.nullishCoalesce);
                break;
            case '||=':
                returnValue = this.doAssignmentExpression(node, this.or);
                break;
            case '&&=':
                returnValue = this.doAssignmentExpression(node, this.and);
                break;
            default:
                throw new SyntaxError(`Unexpected assigment expression operator: ${node.operator}`);
        }
        return returnValue;
    }
}
