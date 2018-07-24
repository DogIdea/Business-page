require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
let navSide = require('page/common/nav-side/index.js');
let _mm = require('util/mm.js');
let _order = require('service/order-service.js');
let templateIndex = require('./index.string');


let page = {
    data: {
       orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        navSide.init({
            name: 'order-list'
        });
        this.loadDetailList();
    },
    bindEvent: function() {
        let _this = this;
        $(document).on('click', '.order-cancel', function() {
            if(window.confirm('确实要取消该订单么？')) {
                _order.cancelOrder(_this.data.orderNumber, function(res) {
                    _mm.successTips('该订单取消成功');
                    _this.loadDetailList();
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                })
            }
        });
    },
    loadDetailList: function() {
       let _this = this,
       orderDetailHtml = '',
       orderNumber = _this.data.orderNumber,
       $content = $('.content');
       $content.html('<div class="loading"></div>');
       _order.getOrderDetail(orderNumber, function(res) {
            _this.dataFilter(res);
            orderDetailHtml = _mm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
       }, function(errMsg) {
            $ontent.html('<p class="err-tip">'+ errMsg +'</p>');
       })
    },
    dataFilter: function(data) {
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }   
};
$(function() {
    page.init();
});