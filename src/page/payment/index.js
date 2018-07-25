require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
let navSide = require('page/common/nav-side/index.js');
let _mm = require('util/mm.js');
let _payment = require('service/payment-service.js');
let templateIndex = require('./index.string');


let page = {
    data: {
       orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        this.loadPaymentInfo();
    },
    loadPaymentInfo: function() {
       let _this = this,
       paymentHtml = '',
       orderNumber = _this.data.orderNumber,
       $pageWrap = $('.page-wrap');
       $pageWrap.html('<div class="loading"></div>');
       _payment.getpaymentInfo(orderNumber, function(res) {
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
       }, function(errMsg) {
            $ontent.html('<p class="err-tip">'+ errMsg +'</p>');
       })
    },
    listenOrderStatus: function() {
        let _this = this;
        this.paymentTimer = window.setInterval(function() {
            _payment.getPaymentStatus(_this.data.orderNumber,function(res) {
                if(res == true) {
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            });
        }, 5e3);
    }
};
$(function() {
    page.init();
});