// eslint-disable-next-line no-unused-vars
class Test {
    variables;
    static DEFAULT_VARIABLES = {
        label: 'DEFAULT_LABEL',
        W: { map: { getZoom: () => 34, zoom: 34 } }
    };

    constructor(args) {
        this.id = args.id;
        this.variables = { ...Test.DEFAULT_VARIABLES, ...args.variables };
        this.code = args.code;
        this.expectedOutput = args.expectedOutput;
        this.expectedVariables = args.expectedVariables;
        if (args.validate) {
            this.validate = args.validate();
        }
    }

    validate(testResult) {
        const validationResult = { outputValidated: false, variablesValidated: false };
        if (this.expectedOutput) {
            if (typeof testResult.output === 'object' && testResult.output instanceof Error) {
                validationResult.outputValidated = typeof this.expectedOutput === 'object'
                    && testResult.output instanceof this.expectedOutput.errorType
                    && testResult.output.message === this.expectedOutput.message;
            } else {
                validationResult.outputValidated = JSON.stringify(testResult.output) === JSON.stringify(this.expectedOutput);
            }
        } else {
            validationResult.outputValidated = true;
        }

        if (this.expectedVariables) {
            // Check expected variable values
            validationResult.variablesValidated = Object.keys(this.expectedVariables)
                .every(key => testResult.variables.hasOwnProperty(key)
                    && JSON.stringify(this.expectedVariables[key]) === JSON.stringify(testResult.variables[key]));

            // Check for unexpected variables
            if (validationResult.variablesValidated) {
                validationResult.variablesValidated = Object.keys(testResult.variables)
                    .every(key => this.expectedVariables.hasOwnProperty(key));
            }
        } else {
            validationResult.variablesValidated = true;
        }

        return validationResult;
    }
}
