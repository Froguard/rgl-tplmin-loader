function cleanRedundantCode(str){
    if(typeof str === 'string'){
        // str = str.replace(/(<!--)([\s\S])*.*(-->)/g, ''); // html-comments  <!-- xxx -->
        str = str.replace(/{!([\s\S])*.*!}/g, '');    // regular-comments  {! xxx !}
        str = str.replace(/[\r\n]|\s+(?=[<{])/g, ''); // \r\n space before < & {
         // \r\n space after > & }
        try{
            str = str.replace(/[}>]\s+/g, function(value){
				return typeof(value)==='string' ? value.substr(0, 1) : '';
			});
        }catch(e){
            console.log('出错', e);
        }
    }
    return str;
};

module.exports = function(content) {
    this.cacheable && this.cacheable();
    // remove redundant code
    content = JSON.stringify(cleanRedundantCode(String(content)));
    this.value = content;
    return "module.exports = " + content;
};
// module.exports.raw = true;
