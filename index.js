module.exports = function(content) {
    this.cacheable && this.cacheable();
    var tpl = content || '';
    tpl = cleanRedundantCode(tpl);// remove redundant code
    this.value = tpl;
    return "module.exports = " + JSON.stringify(tpl);
};
function cleanRedundantCode(str){
    if(typeof str === 'string'){
        str = str.trim();                              // left & right space
        str = str.replace(/<!-[\s\S]*?-->/g, '');      // html-comments  <!-- xxx -->
        str = str.replace(/{![\s\S]*?!}/g, '');        // regular-comments  {! xxx !}
        str = str.replace(/\r|\n|\s+(?=[<{])/g, '');   // \r\n space before < & {
        str = str.replace(/[}>]\s+/g, function(value){ // \r\n space after > & }
            return typeof(value)==='string' ? value.substr(0, 1) : '';
        });
    }
    return str;
};
