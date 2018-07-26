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
        if(type === 'payment') {
            let orderNumber = _mm.getUrlParam('orderNumber'),
            $orerNumber = $element.find('order-number');
            $orderNumber.attr('href',$orderNumber.attr('href') + orderNumber)
        };
        // if(type === 'cart-add') {
        //     console.log(type);
        //     let productId = _mm.getUrlParam('productId'),
        //     $productId = $element.find('continue-shopping');
        //     $productId.attr('href',$productId.attr('href') + productId)
        //     console.log(productId);
        // };
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