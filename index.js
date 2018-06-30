var loaderUtils = require("loader-utils");

module.exports = function(content) {
    this.cacheable && this.cacheable();
    var query = loaderUtils.parseQuery(this.query) || {};
    var tpl = content || '';
    tpl = cleanRedundantCode(tpl, query);// remove redundant code
    this.value = tpl;
    return "module.exports = " + JSON.stringify(tpl);
};
function def(v, d){
    return v === null || v === undefined ? d : v;
}
// pure regEx to resolve it, not via a parser;
function cleanRedundantCode(str, opts){
    opts = opts || {};
    var minimize = def(opts.minimize, true);
    var comments = opts.comments || {};
    var htmlComments = comments.html,
        rglComments = comments.rgl;

    if(minimize && typeof str === 'string'){
        var SINGLE_SPACE = ' ';
        var EMPTY = '';

        // remove html-comments <!-- xxx -->
        str = !htmlComments ? str.replace(/<!-[\s\S]*?-->/g, EMPTY) : str;

        // remove regular-comments {! xxx !}
        str = !rglComments ? str.replace(/{![\s\S]*?!}/g, EMPTY) : str;

        // 暴力全局替换\s，副作用：内容里面有带空格或回车的字符串会被替换截掉
        // str = str.replace(/[\s]{2,}/g, SINGLE_SPACE);
        str = str.replace(/[\f\t\v]{2,}/g, SINGLE_SPACE);

        // // <abc>,<abc/> 左边
        // str = str.replace(/[\s]{2,}(?=<\w+(\s[\s\S]*?)*?\/?>)/g, SINGLE_SPACE);
        // // </abc> 左边
        // str = str.replace(/[\s]{2,}(?=<\/\w+>)/g, SINGLE_SPACE);
        //
        // // js并不支持'后行断言'(?<=condition)这种写法，这里只能采用callback函数来弥补
        //
        // // <abc>,</abc>,<abc/>,/> 右边
        // str = str.replace(/((?:<\/?\w+>)|(?:<\w+\/>)|(?:\/>))[\s]{2,}/g, function($0, $1){
        //     return ($1 ? ($ + SINGLE_SPACE) : $0);
        // });

        // // 花括号左右
        // str = str.replace(/[\s]+(?=(}|\{))/g, SINGLE_SPACE); // 左空格
        // str = str.replace(/(}|\{)(\s+)/g, function($0, $1){  // 右空格
        //     return $1 + SINGLE_SPACE;
        // });
        // // 大小于等号左右
        // str = str.replace(/[\s]+(?=(>|<))/g, SINGLE_SPACE); // 左空格
        // str = str.replace(/(>|<)(\s+)/g, function($0, $1){  // 右空格
        //     return $1 + SINGLE_SPACE;
        // });

        // Last, trim
        str = str.trim();
    }
    return str;
};
