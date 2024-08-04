const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const postcssNestedAncestors = require('postcss-nested-ancestors');
const postcssReporter = require('postcss-reporter');
const postcssCssVariables = require('postcss-css-variables');
const postcssMixins = require('postcss-mixins');
const postcssCascabeLayers = require('@csstools/postcss-cascade-layers');
const cssnano = require('cssnano');
const postcssFailOnWarn = require('postcss-fail-on-warn');
const stylelint = require('stylelint');

module.exports = {
    plugins: {
        'postcss-flexbugs-fixes': {},
        'postcss-import': {
            plugins: ['stylelint', { configFile: '.stylelintrc.js' }],
        },
        'postcss-preset-env': {},
        'postcss-nested': {},
        'postcss-nested-ancestors': {},
        'postcss-reporter': {},
        'postcss-css-variables': {
            preserve: true, // preserve 옵션을 활성화하여 CSS 변수들이 정의되지 않았을 때도 에러를 방지합니다.
            preserveAtRulesOrder: true,
        },
        'postcss-mixins': {},
        //'@csstools/postcss-cascade-layers': {},
        cssnano: {},
        'postcss-fail-on-warn': {},
    },
};
