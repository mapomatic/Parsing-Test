// eslint-disable-next-line no-unused-vars
class Test {
    variables;
    static DEFAULT_VARIABLES = {
        label: 'DEFAULT_LABEL',
        W: { map: { getZoom: () => 34, zoom: 34 } },
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
        const validationResult = { outputValidated: false, variablesValidated: true };
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

        // if (this.expectedVariables) {
        //     // Check expected variable values
        //     validationResult.variablesValidated = Object.keys(this.expectedVariables)
        //         .every(key => testResult.variables.hasOwnProperty(key)
        //             && JSON.stringify(this.expectedVariables[key]) === JSON.stringify(testResult.variables[key]));

        //     // Check for unexpected variables
        //     if (validationResult.variablesValidated) {
        //         validationResult.variablesValidated = Object.keys(testResult.variables)
        //             .every(key => this.expectedVariables.hasOwnProperty(key));
        //     }
        // } else {
        //     validationResult.variablesValidated = true;
        // }

        return validationResult;
    }
}
