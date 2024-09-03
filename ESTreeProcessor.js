/* eslint-disable no-bitwise */
// name         ESTreeProcessor
// namespace    https://github.com/mapomatic
// version      1.0.0
// description  Converts simple text scripts into executable JS (for use with WME GIS Layers userscript)
// author       MapOMatic
// license      GNU GPLv3
// ==/UserScript==

/*
 * The esprima-next library is required to use this.
 * The older esprima library might also work but it lacks some functions.
*/

// TODO: Not working:
// - Classes
// - Probably a lot more I haven't discovered yet.

/* eslint-disable eqeqeq */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-multi-assign */

/* global esprima */

// eslint-disable-next-line func-names, no-unused-vars
const ESTreeProcessor = (function() {
    'use strict';

    const ScopeType = {
        Global: 'Global',
        Function: 'Function',
        Block: 'Block'
    };

    const VariableType = {
        Let: 'Let',
        Const: 'Const',
        Var: 'Var'
    };

    class Scope {
        /** @type {Scope} */
        parent;
        variables = {};
        /** @type {string} */
        type;

        constructor(type, parent) {
            this.type = type;
            this.parent = parent;
            this.variables = {};
        }

        declare(type, name, value = undefined) {
            this.checkAlreadyDeclared(name, type);
            switch (type) {
                case VariableType.Let:
                    this.variables[name] = { type, value };
                    break;
                case VariableType.Const:
                    this.variables[name] = { type, value };
                    break;
                case VariableType.Var: {
                    let scope = this;
                    while (scope) {
                        if (scope.type === ScopeType.Function || scope.type === ScopeType.Global) {
                            scope.variables[name] = { type, value };
                            scope = undefined;
                        } else {
                            scope = scope.parent;
                        }
                    }
                    break;
                }
                default:
                    throw new SyntaxError(`Unexpected variable declaration type: ${type}`);
            }
        }

        checkAlreadyDeclared(name, type) {
            let scope = this;
            while (scope) {
                if (scope.variables.hasOwnProperty(name)) {
                    if (type === VariableType.Const || type === VariableType.Let
                        || scope.variables[name].type !== VariableType.Var) {
                        throw new SyntaxError(`Identifier '${name}' has already been declared`);
                    }
                }
                if (scope.type === ScopeType.Function || scope.type === ScopeType.Global) {
                    scope = undefined;
                } else {
                    scope = scope.parent;
                }
            }
        }

        setValue(name, value) {
            const reference = this.getReference(name, true);
            if (!reference) {
                throw new ReferenceError(`${name} is not defined.`);
            }
            if (reference.type === VariableType.Const) {
                throw new TypeError(`Assignment to constant variable: ${name}`);
            }
            return (reference.value = value);
        }

        getValue(name) {
            const reference = this.getReference(name);
            return reference?.value;
        }

        getReference(name) {
            let scope = this;
            while (scope) {
                if (scope.variables.hasOwnProperty(name)) {
                    return scope.variables[name];
                }
                if (scope.type === ScopeType.Global) {
                    scope = undefined;
                } else {
                    scope = scope.parent;
                }
            }
            return undefined;
        }

        createChildScope(type) {
            return new Scope(type, this);
        }
    }

    class FlowStopper {}
    class Break extends FlowStopper {}
    class Continue extends FlowStopper {}
    class Return extends FlowStopper {
        value;
        constructor(value) {
            super();
            this.value = value;
        }
    }
    class Debugger {}
    class ChainIsNullish {}

    // eslint-disable-next-line no-shadow
    class ESTreeProcessor {
        process(esTree, globalVariables) {
            this.globalVariables = { ...globalVariables };
            return { output: this.processNode(esTree, new Scope(ScopeType.Global)), variables: this.globalVariables };
        }

        processNode(node, scope) {
            // if (!scope) debugger;
            // if (!node) debugger;
            let returnValue;
            switch (node.type) {
                case esprima.Syntax.Program:
                    returnValue = this.processProgram(node, scope);
                    break;
                case esprima.Syntax.ExpressionStatement:
                    returnValue = this.processNode(node.expression, scope);
                    break;
                case esprima.Syntax.Literal:
                    returnValue = ESTreeProcessor.processLiteral(node, scope);
                    break;
                case esprima.Syntax.MemberExpression:
                    returnValue = this.processMemberExpression(node, scope);
                    break;
                case esprima.Syntax.BinaryExpression:
                    returnValue = this.processBinaryExpression(node, scope);
                    break;
                case esprima.Syntax.VariableDeclaration:
                    returnValue = this.processVariableDeclaration(node, scope);
                    break;
                case esprima.Syntax.VariableDeclarator:
                    returnValue = this.processVariableDeclarator(node, scope);
                    break;
                case esprima.Syntax.CallExpression:
                    returnValue = this.processCallExpression(node, scope);
                    break;
                case esprima.Syntax.AssignmentExpression:
                    returnValue = this.processAssigmentExpression(node, scope);
                    break;
                case esprima.Syntax.Identifier:
                    returnValue = ESTreeProcessor.processIdentifier(node, scope);
                    break;
                case esprima.Syntax.IfStatement:
                    returnValue = this.processIfStatement(node, scope);
                    break;
                case esprima.Syntax.BlockStatement:
                    returnValue = this.processBlockStatement(node, scope);
                    break;
                case esprima.Syntax.EmptyStatement:
                    // do nothing;
                    break;
                case esprima.Syntax.TemplateLiteral:
                    returnValue = this.processTemplateLiteral(node, scope);
                    break;
                case esprima.Syntax.NewExpression:
                    returnValue = this.processNewExpression(node, scope);
                    break;
                case esprima.Syntax.FunctionDeclaration:
                    returnValue = this.processFunctionDeclaration(node, scope);
                    break;
                case esprima.Syntax.ReturnStatement:
                    returnValue = this.processReturnStatement(node, scope);
                    break;
                case esprima.Syntax.LogicalExpression:
                    returnValue = this.processLogicalExpression(node, scope);
                    break;
                case esprima.Syntax.UnaryExpression:
                    returnValue = this.processUnaryExpression(node, scope);
                    break;
                case esprima.Syntax.ArrayExpression:
                    returnValue = this.processArrayExpression(node, scope);
                    break;
                case esprima.Syntax.ConditionalExpression:
                    returnValue = this.processConditionalExpression(node, scope);
                    break;
                case esprima.Syntax.ObjectExpression:
                    returnValue = this.processObjectExpression(node, scope);
                    break;
                case esprima.Syntax.FunctionExpression:
                    returnValue = this.processFunctionExpression(node, scope);
                    break;
                case esprima.Syntax.ArrowFunctionExpression:
                    returnValue = this.processArrowFunctionExpression(node, scope);
                    break;
                case esprima.Syntax.ChainExpression:
                    returnValue = this.processChainExpression(node, scope);
                    break;
                case esprima.Syntax.UpdateExpression:
                    returnValue = this.processUpdateExpression(node, scope);
                    break;
                case esprima.Syntax.ForStatement:
                    returnValue = this.processForStatement(node, scope);
                    break;
                case esprima.Syntax.TryStatement:
                    returnValue = this.processTryStatement(node, scope);
                    break;
                case esprima.Syntax.BreakStatement:
                    returnValue = ESTreeProcessor.processBreakStatement();
                    break;
                case esprima.Syntax.ContinueStatement:
                    returnValue = ESTreeProcessor.processContinueStatement();
                    break;
                case esprima.Syntax.DebuggerStatement:
                    returnValue = ESTreeProcessor.processDebuggerStatement();
                    break;
                case esprima.Syntax.SwitchStatement:
                    returnValue = this.processSwitchStatement(node, scope);
                    break;
                default:
                    throw new SyntaxError(`Unexpected node type: ${node.type}`);
            }
            return returnValue;
        }

        processSwitchStatement(node, scope) {
            const discriminant = this.processNode(node.discriminant, scope);
            let matchIndex = -1;
            let defaultIndex = -1;
            for (let i = 0; i < node.cases.length && matchIndex === -1; i++) {
                const switchCase = node.cases[i];
                if (!switchCase.test) {
                    defaultIndex = i;
                } else if (this.processNode(switchCase.test, scope) === discriminant) {
                    matchIndex = i;
                }
            }
            if (matchIndex === -1) matchIndex = defaultIndex;

            let returnValue;
            if (matchIndex > -1) {
                const switchScope = scope.createChildScope(ScopeType.Block);
                for (let i = matchIndex; i < node.cases.length && !(returnValue instanceof FlowStopper); i++) {
                    let result;
                    const switchCase = node.cases[i];
                    for (let j = 0; j < switchCase.consequent.length && !(result instanceof FlowStopper); j++) {
                        result = this.processNode(switchCase.consequent[j], switchScope);
                        if (!(result instanceof Break || result instanceof Continue)) {
                            returnValue = result;
                        }
                    }
                }
            }
            return returnValue;
        }

        static processDebuggerStatement() {
            // eslint-disable-next-line no-debugger
            debugger;
            return new Debugger();
        }

        processTryStatement(node, scope) {
            let returnValue;
            try {
                returnValue = this.processNode(node.block, scope);
            } catch (e) {
                // Based on research, I think a Function scope is appropriate here but not certain.
                const catchScope = scope.createChildScope(ScopeType.Function);
                node.handler.param.returnName = true;
                catchScope.declare(VariableType.Var, this.processNode(node.handler.param, catchScope), e);
                this.processNode(node.handler.body, catchScope);
            } finally {
                if (node.finalizer) {
                    this.processNode(node.finalizer, scope);
                }
            }
            return returnValue;
        }

        processObjectExpression(node, scope) {
            const returnValue = {};
            node.properties.forEach(property => {
                property.key.returnName = !node.computed;
                const key = this.processNode(property.key, scope);
                returnValue[key] = this.processNode(property.value, scope);
            });
            return returnValue;
        }

        processConditionalExpression(node, scope) {
            const returnValue = this.processNode(node.test, scope) ? this.processNode(node.consequent, scope) : this.processNode(node.alternate, scope);
            return returnValue;
        }

        processArrayExpression(node, scope) {
            const returnValue = node.elements.map(element => this.processNode(element, scope));
            return returnValue;
        }

        setScopeValue(targetNode, value, scope) {
            switch (targetNode.type) {
                case esprima.Syntax.MemberExpression: {
                    const object = this.processNode(targetNode.object, scope);
                    targetNode.property.returnName = true;
                    const propertyName = this.processNode(targetNode.property, scope);
                    object[propertyName] = value;
                    break;
                }
                case esprima.Syntax.Identifier:
                    scope.setValue(targetNode.name, value);
                    break;
                default:
                    throw new SyntaxError(`Unexpected target node type in setValue(): ${targetNode.type}`);
            }
            return value;
        }

        processUpdateExpression(node, scope) {
            const oldValue = this.processNode(node.argument, scope);
            let newValue;
            switch (node.operator) {
                case '++':
                    newValue = this.setScopeValue(node.argument, oldValue + 1, scope);
                    break;
                case '--':
                    newValue = this.setScopeValue(node.argument, oldValue - 1, scope);
                    break;
                default:
                    throw new SyntaxError(`Unexpected update expression operator: ${node.operator}`);
            }
            return node.prefix ? newValue : oldValue;
        }

        processForStatement(node, scope) {
            let returnValue;
            this.processNode(node.init, scope);
            while (this.processNode(node.test, scope)) {
                returnValue = this.processNode(node.body, scope);
                if (returnValue instanceof FlowStopper) {
                    if (returnValue instanceof Return) {
                        returnValue = returnValue.value;
                    }
                    break;
                }
                this.processNode(node.update, scope);
            }
            return returnValue;
        }

        processUnaryExpression(node, scope) {
            let returnValue;
            switch (node.operator) {
                case '!':
                    returnValue = !this.processNode(node.argument, scope);
                    break;
                case '~':
                    returnValue = ~this.processNode(node.argument, scope);
                    break;
                case '-':
                    returnValue = -this.processNode(node.argument, scope);
                    break;
                case 'typeof':
                    returnValue = typeof this.processNode(node.argument, scope);
                    break;
                default:
                    throw new SyntaxError(`Unexpected unary expression operator: ${node.operator}`);
            }
            return returnValue;
        }

        processLogicalExpression(node, scope) {
            let returnValue;
            switch (node.operator) {
                case '&&':
                    returnValue = this.processNode(node.left, scope) && this.processNode(node.right, scope);
                    break;
                case '||':
                    returnValue = this.processNode(node.left, scope) || this.processNode(node.right, scope);
                    break;
                case '??':
                    returnValue = this.processNode(node.left, scope) ?? this.processNode(node.right, scope);
                    break;
                default:
                    throw new SyntaxError(`Unexpected logical expression operator: ${node.operator}`);
            }
            return returnValue;
        }

        processReturnStatement(node, scope) {
            const returnValue = this.processNode(node.argument, scope);
            return new Return(returnValue);
        }

        static processContinueStatement() {
            return new Continue();
        }

        static processBreakStatement() {
            return new Break();
        }

        /**
         *
         * @param {*} node
         * @param {Scope} scope
         * @returns
         */
        processArrowFunctionExpression(node, scope) {
            const func = (...args) => {
                const esTreeArgs = args.map(arg => {
                    const argNode = {
                        type: esprima.Syntax.Literal,
                        value: arg
                    };
                    return argNode;
                });

                const funcScope = scope.createChildScope(ScopeType.Function);
                for (let i = 0; i < Math.min(esTreeArgs.length, node.params.length); i++) {
                    const param = node.params[i];
                    param.returnName = true;
                    funcScope.declare(
                        VariableType.Var,
                        this.processNode(param, funcScope),
                        this.processNode(esTreeArgs[i], funcScope)
                    );
                }
                let returnValue = this.processNode(node.body, funcScope);
                if (returnValue instanceof Return) {
                    returnValue = returnValue.value;
                }
                return returnValue;
            };
            return func;
        }

        processChainExpression(node, scope) {
            let returnValue;
            switch (node.expression.type) {
                case esprima.Syntax.CallExpression:
                case esprima.Syntax.MemberExpression: {
                    returnValue = this.processNode(node.expression, scope);
                    break;
                }
                default:
                    throw new SyntaxError(`Unexpected chain expression type: ${node.expression.type}`);
            }
            if (returnValue instanceof ChainIsNullish) returnValue = undefined;
            return returnValue;
        }

        processFunctionDeclaration(node, scope) {
            const func = (...args) => {
                const esTreeArgs = args.map(arg => {
                    const argNode = {
                        type: esprima.Syntax.Literal,
                        value: arg
                    };
                    return argNode;
                });

                const funcScope = scope.createChildScope(ScopeType.Function);
                for (let i = 0; i < Math.min(esTreeArgs.length, node.params.length); i++) {
                    const param = node.params[i];
                    param.returnName = true;
                    funcScope.declare(
                        VariableType.Var,
                        this.processNode(param, funcScope),
                        this.processNode(esTreeArgs[i], funcScope)
                    );
                }
                let returnValue = this.processNode(node.body, funcScope);
                if (returnValue instanceof Return) {
                    returnValue = returnValue.value;
                }
                return returnValue;
            };
            if (node.id) {
                node.id.returnName = true;
                const funcName = this.processNode(node.id, scope);
                scope.declare(VariableType.Var, funcName, func);
            }
            return func;
        }

        processFunctionExpression(node, scope) {
            const func = (...args) => {
                const esTreeArgs = args.map(arg => {
                    const argNode = {
                        type: esprima.Syntax.Literal,
                        value: arg
                    };
                    return argNode;
                });

                const funcScope = scope.createChildScope(ScopeType.Function);
                for (let i = 0; i < Math.min(esTreeArgs.length, node.params.length); i++) {
                    const param = node.params[i];
                    param.returnName = true;
                    funcScope.declare(
                        VariableType.Var,
                        this.processNode(param, funcScope),
                        this.processNode(esTreeArgs[i], funcScope)
                    );
                }
                let returnValue = this.processNode(node.body, funcScope);
                if (returnValue instanceof Return) {
                    returnValue = returnValue.value;
                }
                return returnValue;
            };
            return func;
        }

        processProgram(node, scope) {
            let returnValue;
            // Add global variables
            Object.keys(this.globalVariables).forEach(key => {
                scope.declare(VariableType.Let, key, this.globalVariables[key]);
            });
            node.body.forEach(childNode => {
                returnValue = this.processNode(childNode, scope);
            });
            // this._scopeContainer.removeCurrentScope();
            return returnValue;
        }

        processNewExpression(node, scope) {
            const args = node.arguments.map(argument => this.processNode(argument, scope));
            return Reflect.construct(this.processNode(node.callee, scope), args);
        }

        processTemplateLiteral(node, scope) {
            let returnValue = '';
            for (let i = 0; i < node.quasis.length; i++) {
                returnValue += node.quasis[i].value.cooked;
                if (!node.quasis[i].tail) {
                    returnValue += this.processNode(node.expressions[i], scope);
                }
            }
            return returnValue;
        }

        processBlockStatement(node, scope) {
            let returnValue;
            // TODO: I don't think we need to ignore the block scope in a function declaration. Test it.
            // switch (context.type) {
            //     case esprima.Syntax.FunctionDeclaration:
            //         break;
            //     default:
            const blockScope = scope.createChildScope(ScopeType.Block);
            // }

            for (let i = 0; i < node.body.length; i++) {
                const childNode = node.body[i];
                const result = this.processNode(childNode, blockScope);
                if (result instanceof FlowStopper) {
                    if (result instanceof Return) {
                        returnValue = result;
                    }
                    break;
                } else if (result instanceof Debugger) {
                    // do nothing
                } else {
                    returnValue = result;
                }
            }

            return returnValue;
        }

        processIfStatement(node, scope) {
            let returnValue;
            const test = this.processNode(node.test, scope);
            if (test) {
                returnValue = this.processNode(node.consequent, scope);
            } else if (node.alternate) {
                returnValue = this.processNode(node.alternate, scope);
            }
            return returnValue;
        }

        static processLiteral(node) {
            return node.value;
        }

        static processIdentifier(node, scope) {
            let returnValue;
            if (node.returnName) {
                returnValue = node.name;
            } else {
                returnValue = scope.getValue(node.name);
            }
            return returnValue;
        }

        /**
         *
         * @param {*} expression
         * @param {Scope} scope
         * @returns
         */
        getMemberExpressionObject(expression, scope) {
            let returnValue;
            switch (expression.object.type) {
                case esprima.Syntax.Identifier: {
                    returnValue = scope.getValue(expression.object.name);
                    break;
                }
                case esprima.Syntax.CallExpression:
                case esprima.Syntax.MemberExpression: {
                    const object = this.processNode(expression.object, scope);
                    returnValue = object;
                    break;
                }
                default:
                    throw new SyntaxError(`Unexpected member expression object type: ${expression.object.type}`);
            }
            return returnValue;
        }

        processMemberExpression(node, scope) {
            let returnValue;
            const object = this.getMemberExpressionObject(node, scope);

            if (object == null && node.optional) {
                returnValue = new ChainIsNullish();
            } else if (object != null || (object == null && !node.optional)) {
                node.property.returnName = !node.computed;
                const propertyName = this.processNode(node.property, scope);
                // if (object[propertyName] == null) {
                //     console.warn(`Object does not contain this property: ${propertyName}`);
                // }
                returnValue = object[propertyName];
            }
            return returnValue;
        }

        doBinaryExpression(node, func, scope) {
            return func(this.processNode(node.left, scope), this.processNode(node.right, scope));
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

        processBinaryExpression(node, scope) {
            let returnValue;
            const process = operation => this.doBinaryExpression(node, operation, scope);
            switch (node.operator) {
                case '+':
                    returnValue = process(ESTreeProcessor.add);
                    break;
                case '-':
                    returnValue = process(ESTreeProcessor.subtract);
                    break;
                case '*':
                    returnValue = process(ESTreeProcessor.multiply);
                    break;
                case '/':
                    returnValue = process(ESTreeProcessor.divide);
                    break;
                case '%':
                    returnValue = process(ESTreeProcessor.mod);
                    break;
                case '**':
                    returnValue = process(ESTreeProcessor.power);
                    break;
                case '>':
                    returnValue = process((left, right) => left > right);
                    break;
                case '<':
                    returnValue = process((left, right) => left < right);
                    break;
                case '==':
                    returnValue = process((left, right) => left == right);
                    break;
                case '===':
                    returnValue = process((left, right) => left === right);
                    break;
                case '>=':
                    returnValue = process((left, right) => left >= right);
                    break;
                case '<=':
                    returnValue = process((left, right) => left <= right);
                    break;
                case '!=':
                    returnValue = process((left, right) => left != right);
                    break;
                case '!==':
                    returnValue = process((left, right) => left !== right);
                    break;
                case '^':
                    returnValue = process(ESTreeProcessor.bitwiseXOR);
                    break;
                case '|':
                    returnValue = process(ESTreeProcessor.bitwiseOR);
                    break;
                case '&':
                    returnValue = process(ESTreeProcessor.bitwiseAND);
                    break;
                case '>>':
                    returnValue = process(ESTreeProcessor.bitwiseRightShift);
                    break;
                case '<<':
                    returnValue = process(ESTreeProcessor.bitwiseLeftShift);
                    break;
                case '>>>':
                    returnValue = process(ESTreeProcessor.bitwiseUnsignedRightShift);
                    break;
                default:
                    throw new SyntaxError(`Unexpected binary expression operator: ${node.operator}`);
            }
            return returnValue;
        }

        processVariableDeclaration(node, scope) {
            switch (node.kind) {
                case 'let':
                case 'const':
                case 'var':
                    node.declarations.forEach(declaration => {
                        declaration.kind = node.kind;
                        this.processNode(declaration, scope);
                    });
                    break;
                default:
                    throw new SyntaxError(`Unexpected variable declaration kind: ${node.type}`);
            }
            // I believe declarations always return undefined
        }

        /**
         *
         * @param {*} node
         * @param {Scope} scope
         */
        processVariableDeclarator(node, scope) {
            switch (node.id.type) {
                case esprima.Syntax.Identifier: {
                    node.id.returnName = true;
                    const name = this.processNode(node.id, scope);
                    const value = node.init ? this.processNode(node.init, scope) : undefined;
                    let declarationType;
                    switch (node.kind) {
                        case 'let':
                            declarationType = VariableType.Let;
                            break;
                        case 'const':
                            declarationType = VariableType.Const;
                            break;
                        case 'var':
                            declarationType = VariableType.Var;
                            break;
                        default:
                            throw new TypeError(`Unexpected variable declaration kind: ${node.kind}`);
                    }
                    scope.declare(declarationType, name, value);
                    break;
                }
                case esprima.Syntax.ObjectPattern: {
                    const object = this.processNode(node.init, scope);
                    node.id.properties.forEach(property => {
                        property.key.returnName = true;
                        const name = this.processNode(property.key, scope);
                        property.value.returnName = true;
                        const valueName = this.processNode(property.value, scope);
                        const value = object[valueName];
                        let declarationType;
                        switch (node.kind) {
                            case 'let':
                                declarationType = VariableType.Let;
                                break;
                            case 'const':
                                declarationType = VariableType.Const;
                                break;
                            case 'var':
                                declarationType = VariableType.Var;
                                break;
                            default:
                                throw new TypeError(`Unexpected variable declaration kind: ${node.kind}`);
                        }
                        scope.declare(declarationType, name, value);
                    });
                    break;
                }
                default:
                    throw new SyntaxError(`Unexpected variable declarator id type: ${node.id.type}`);
            }
        }

        /**
         *
         * @param {*} node
         * @param {Scope} scope
         * @returns
         */
        processCallExpression(node, scope) {
            // TODO: This code doesn't pass the sniff test. Need to work on it.
            const { callee } = node;
            let methodToCall;
            let calleeObject;
            let returnValue;
            switch (callee.type) {
                case esprima.Syntax.MemberExpression: {
                    calleeObject = this.processNode(callee.object, scope);
                    if (calleeObject == null) {
                        if (callee.optional) {
                            returnValue = new ChainIsNullish();
                        } else {
                            throw new SyntaxError('Callee object not found in call expression.');
                        }
                    } else if (calleeObject instanceof ChainIsNullish) {
                        returnValue = new ChainIsNullish();
                    } else {
                        methodToCall = calleeObject[callee.property.name];
                    }
                    break;
                }
                case esprima.Syntax.Identifier:
                    methodToCall = scope.getValue(callee.name);
                    break;
                default:
                    throw new SyntaxError(`Unexpected callee type in call expression: ${callee.type}`);
            }

            if (!(returnValue instanceof ChainIsNullish)) {
                if (methodToCall == null) {
                    if (node.optional) {
                        returnValue = new ChainIsNullish();
                    } else {
                        let methodName;
                        switch (callee.type) {
                            case esprima.Syntax.Identifier:
                                methodName = callee.name;
                                break;
                            case esprima.Syntax.MemberExpression:
                                callee.property.returnName = true;
                                methodName = this.processNode(callee.property);
                                break;
                            default:
                        }
                        throw new SyntaxError(`Method not found: ${methodName}`);
                    }
                } else {
                    const args = node.arguments.map(arg => this.processNode(arg, scope));
                    // if (!methodToCall) debugger;
                    returnValue = methodToCall.call(calleeObject, ...args);
                }
            }
            return returnValue;
        }

        doAssignmentExpression(node, func, scope) {
            let returnValue;
            let leftValue;
            switch (node.left.type) {
                case esprima.Syntax.Identifier: {
                    leftValue = scope.getValue(node.left.name);
                    returnValue = this.setScopeValue(node.left, func(leftValue, this.processNode(node.right, scope)), scope);
                    break;
                }
                case esprima.Syntax.MemberExpression: {
                    const object = this.getMemberExpressionObject(node.left, scope);
                    const propertyName = this.processNode(node.left.property, scope);
                    leftValue = object[propertyName];
                    returnValue = (object[propertyName] = func(leftValue, this.processNode(node.right, scope)));
                    break;
                }
                default:
                    throw new SyntaxError(`Unexpected type on left side of assignment expression: ${node.left.type}`);
            }
            return returnValue;
        }

        static nullishCoalesce(left, right) {
            return left ?? right;
        }

        static or(left, right) {
            return left || right;
        }

        static and(left, right) {
            return left && right;
        }

        static bitwiseAND(left, right) {
            return left & right;
        }

        static bitwiseOR(left, right) {
            return left | right;
        }

        static bitwiseXOR(left, right) {
            return left ^ right;
        }

        static bitwiseLeftShift(left, right) {
            return left << right;
        }

        static bitwiseRightShift(left, right) {
            return left >> right;
        }

        static bitwiseUnsignedRightShift(left, right) {
            return left >>> right;
        }

        processAssigmentExpression(node, scope) {
            let returnValue;
            const assign = operation => this.doAssignmentExpression(node, operation, scope);
            switch (node.operator) {
                case '=':
                    returnValue = this.setScopeValue(node.left, this.processNode(node.right, scope), scope);
                    break;
                case '+=':
                    returnValue = assign(ESTreeProcessor.add);
                    break;
                case '-=':
                    returnValue = assign(ESTreeProcessor.subtract);
                    break;
                case '*=':
                    returnValue = assign(ESTreeProcessor.multiply);
                    break;
                case '/=':
                    returnValue = assign(ESTreeProcessor.divide);
                    break;
                case '%=':
                    returnValue = assign(ESTreeProcessor.mod);
                    break;
                case '**=':
                    returnValue = assign(ESTreeProcessor.power);
                    break;
                case '??=':
                    returnValue = assign(ESTreeProcessor.nullishCoalesce);
                    break;
                case '||=':
                    returnValue = assign(ESTreeProcessor.or);
                    break;
                case '&&=':
                    returnValue = assign(ESTreeProcessor.and);
                    break;
                case '<<=':
                    returnValue = assign(ESTreeProcessor.bitwiseLeftShift);
                    break;
                case '>>=':
                    returnValue = assign(ESTreeProcessor.bitwiseRightShift);
                    break;
                case '>>>=':
                    returnValue = assign(ESTreeProcessor.bitwiseUnsignedRightShift);
                    break;
                case '&=':
                    returnValue = assign(ESTreeProcessor.bitwiseAND);
                    break;
                case '|=':
                    returnValue = assign(ESTreeProcessor.bitwiseOR);
                    break;
                case '^=':
                    returnValue = assign(ESTreeProcessor.bitwiseXOR);
                    break;
                default:
                    throw new SyntaxError(`Unexpected assigment expression operator: ${node.operator}`);
            }
            return returnValue;
        }
    }

    return ESTreeProcessor;
})();
