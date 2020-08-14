module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    root: true,
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module'
    },
    env: {
        es6: true
    },
    rules: {
        'no-console': 0,
        'no-var': 2,
        'prefer-const': 2,
        semi: 2,
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
