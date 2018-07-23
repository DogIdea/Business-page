require('./index.css');
require('page/common/header/index.js');
let _mm = require('util/mm.js');
let _order = require('service/order-service.js');
let _address = require('service/address-service.js')
let templateProduct = require('./product-list.string');
let templateAddress = require('./address-list.string');
let nav = require('page/common/nav/index.js');

let page = {
    data: {
        selectedAddressId: null
    },
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        this.loadAddressList();
        this.loadProductList();
    },
    loadAddressList: function() {
        let _this = this;
        _address.getAddressList(function(res) {
            let addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function(errMsg) {
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        })
    },
    loadProductList: function() {
        let _this = this;
        _order.getProductList(function(res) {
            let productListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function(errMsg) {
            $('product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>')
        })
    }
};
$(function() {
    page.init();
})