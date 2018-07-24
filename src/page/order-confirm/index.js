require('./index.css');
require('page/common/header/index.js');
let _mm = require('util/mm.js');
let _order = require('service/order-service.js');
let _address = require('service/address-service.js')
let templateProduct = require('./product-list.string');
let templateAddress = require('./address-list.string');
let addressModal = require('./address-modal.js')
let nav = require('page/common/nav/index.js');

let page = {
    data: {
        selectedAddressId: null
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function() {
        let _this = this;
        $(document).on('click', '.address-item', function() {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        $(document).on('click', '.order-submit', function() {
            let shippingId = _this.data.selectedAddressId;
            if(shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, function(res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function(errMsg) {
                    _mm.errorTips(errMsg)
                })
            }else {
                _mm.errorTips('请选择地址后再提交')
            }
        });
        $(document).on('click', '.address-add', function() {
            addressModal.show({
                isUpdate: false,
                onSuccess: function() {
                    _this.loadAddressList();
                }
            });
        });
        $(document).on('click', '.address-update', function(e) {
            e.stopPropagation();
            let shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res) {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function() {
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            });
        });
        $(document).on('click', '.address-delete', function(e) {
            e.stopPropagation();
            let id = $(this).parents('.address-item').data('id');
            if(window.confirm('确认要删除该地址？')) {
                _address.deleteAddress(id, function(res){
                    _this.loadAddressList();
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                })
            }
        });
    },
    loadAddressList: function() {
        $('.address-con').html('<div class="loading"></div>');
        let _this = this;
        _address.getAddressList(function(res) {
            _this.addressFilter(res);
            let addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function(errMsg) {
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        })
    },
    addressFilter: function(data) {
        if(this.data.selectedAddressId) {
            let selectedAddressIdFlag = false;
            for(let i = 0, length = data.list.length; i < length; i++) {
                if(data.list[i].id === this.data.selectedAddressId) {
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            };
            if(!selectedAddressIdFlag) {
                this.data.selectedAddressId = null;
            } 
        };
    },
    loadProductList: function() {
        let _this = this;
        $('.product-con').html('<div class="loading"></div>');
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