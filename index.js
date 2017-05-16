'use strict';
let loaderUtils = require('loader-loaderUtils');
// let assign = require('object-assign');
// let compress = require('html-minifier').minify;

const cleanRedundantCode = str => {
    if(typeof str === 'string'){
        str = str.replace(/{!([\s\S])*.*!}/g, '');    // regular-comments  {! xxx !}
        str = str.replace(/[\r\n]|\s+(?=[<{])/g, ''); // \r\n space before < & {
        str = str.replace(/[}>]\s+/g, value => value.substr(0, 1)); // \r\n space after > & }
    }
    return str;
};

module.exports = function(content) {
    this.cacheable && this.cacheable();
    let opts = loaderUtils.parseQuery(this.query) || {};// loaderUtils.getOptions(this) || {};
    opts.filename = this.resource;

    // remove redundant code
    content = cleanRedundantCode(JSON.stringify(content));

    this.value = content;
    return `module.exports = ${content}`;

    // compress code
    // opts = assign({
    //     collapseWhitespace: true,
    //     removeComments: true,
    //     minifyJS: false,
    //     minifyCSS: true,
    //     ignoreCustomComments: [
    //         /({!)(([\s\S])*.*)(!})/    // 忽略 regularJs自身的注释语法
    //     ],
    //     ignoreCustomFragments: [
    //         /<(\/)?([\s\S])*.*(\/)?>/  // 忽略的自定义标签语法 <abc>,</abc>
    //     ],
    //     customEventAttributes: [
    //         /^on[a-z]{3,}$/,
    //         /^on-[a-z]{3,}$/,
    //         /^r[a-z]{3,}$/,
    //         /^r-[a-z]{3,}$/
    //     ],
    //     customAttrCollapse: [],
    //     customAttrAssign: []
    // }, opts);
    // content = compress(content), opts);
};
// module.exports.raw = true;
