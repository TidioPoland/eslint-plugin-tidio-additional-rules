/**
 * @fileoverview useSelector and useDispatch should not be imported in webApp and mobileApp
 * @author Marcin Brumer
 */
'use strict';
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const helpers = require("./helpers");
module.exports = {
    meta: {
        docs: {
            description: "useSelector and useDispatch should not be imported in webApp and mobileApp",
            category: 'Stylistic Issues',
            recommended: false
        },
        fixable: null, // or "code" or "whitespace"
        schema: [{
            module: {
                type: 'string',
                required: true
            }
        }]
    },

    create: function(context) {
        return {
            ImportDeclaration(node) {
                const foundModule = context.options[0] || { "module": '' };
                const { module } = foundModule;
                const fileName = context.getFilename();
                if (fileName.includes('.test.') || !fileName.includes(module) ) {
                    return undefined;
                }
                const correctVariables = [];
                const incorrectVariables = [];

                if (node.source.value === 'react-redux') {
                    for (let i=0;i<node.specifiers.length;i+=1) {
                        if (node.specifiers[i].imported.name === 'useSelector') {
                            incorrectVariables.push(node.specifiers[i].imported.name)
                            correctVariables.push('useAppSelector')
                        } else if (node.specifiers[i].imported.name === 'useDispatch') {
                            incorrectVariables.push(node.specifiers[i].imported.name)
                            correctVariables.push('useAppDispatch')
                        }
                    }
                }

                if (incorrectVariables.length === 0) {
                    return undefined;
                }

                context.report({
                    node: node,
                    message: `${incorrectVariables.join(', ')} should not be used in ${module}, use ${correctVariables.join(', ')} instead`
                });
            }
        };
    }
};
