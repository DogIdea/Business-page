require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
let _mm = require('util/mm.js');
let _product = require('service/product-service.js');
let _cart = require('service/cart-service.js');
let templateIndex = require('./index.string');

let page = {
    data: {
        productId : _mm.getUrlParam('productId') || '',
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        if(!this.data.productId) {
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent: function() {
        let _this = this   
    },
    loadDetail: function() {
        let _this = this,
        html = '',
        $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _product.getProductDetail(this.data.productId, function(res) {
            _this.filter(res);
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg) {
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        });  
    },
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function() {
    page.init();
})
