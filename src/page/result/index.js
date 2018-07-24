require('./index.css');
require('page/common/nav-simple/index.js');
let _mm = require('util/mm.js');

// $(function(){
//     let type = _mm.getUrlParam('type') || 'default',
//     $element = $('.' + type + '-success');
//     $element.show();
// })
let page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        let type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
        $element.show();
    },
    bindEvent: function() {
        $(document).on('click','.continue-shopping',function() {
            window.history.go(-2);
        })
    }
}
$(function() {
    page.init();
})