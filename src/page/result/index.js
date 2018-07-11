require('./index.css');
require('page/common/nav-simple/index.js');
let _mm = require('util/mm.js');

$(function(){
    let type = _mm.getUrlParam('type') || 'default',
    $element = $('.' + type + '-success');
    $element.show();
})