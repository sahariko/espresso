module.exports = {
    extends: [
        'eslint:recommended'
    ],
    root: true,
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module'
    },
    env: {
        es6: true,
        node: true
    },
    rules: {
        'no-console': 0,
        'no-var': 2,
        'prefer-const': 2,
        semi: [2, 'never'],
        quotes: [2, 'single']
    },
    overrides: [
        {
            files: ['server/**/*.js', 'bin/**/*.js'],
            env: {
                node: true
            }
        },
        {
            files: ['client/**/*.js'],
            env: {
                node: true,
                browser: true
            }
        }
    ]
}
