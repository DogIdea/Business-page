require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
let navSide = require('page/common/nav-side/index.js');
let _mm = require('util/mm.js');
let _order = require('service/order-service.js');
let templateIndex = require('./index.string');
let Pagination = require('util/pagination/index.js');


let page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 2
        }
    },
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        this.loadOrderList();
        navSide.init({
            name: 'order-list'
        });
    },
    loadOrderList: function() {
       let _this = this,
       orderListHtml = '',
       listParam = this.data.listParam,
       $listCon = $('.order-list-con');
       $listCon.html('<div class="loading"></div>');
       _order.getOrderList(listParam, function(res) {
            orderListHtml = _mm.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            })
       }, function(errMsg) {
            $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
       })
    },
    loadPagination: function(pageInfo) {
        let _this = this;
        _this.pagination ? '' : (_this.pagination = new Pagination());
        console.log(_this.pagination);
        _this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum) {
                
                _this.data.listParam.pageNum = pageNum
                _this.loadOrderList();
            }
        }))
    }   
};
$(function() {
    page.init();
});