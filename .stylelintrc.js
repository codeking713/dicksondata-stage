// https://stylelint.io/user-guide/configure
module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-scss'],
  rules: {
    // 'at-rule-no-unknown': [
    //   true,
    //   {
    //     ignoreAtRules: [
    //       'layer',
    //       'apply',
    //       'variants',
    //       'responsive',
    //       'screen'
    //     ]
    //   }
    // ],
    'at-rule-no-unknown': null,
    'declaration-block-trailing-semicolon': null,
    'scss/at-rule-no-unknown': true,
    'no-descending-specificity': null
  }
}
