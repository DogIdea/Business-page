require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
let _mm = require('util/mm.js');
let _product = require('service/product-service.js');
let templateIndex = require('./index.string');
let Pagination = require('util/pagination/index.js');

let page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || 'default',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 5
        }
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadList();
    },
    bindEvent: function() {
        let _this = this;
        $('.sort-item').click(function() {
            let  $this = $(this);
            _this.data.listParam.pageNum = 1;
            if($this.data('type') === 'default') {
                if($this.hasClass('active')) {
                    return;
                }else {
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            } else if($this.data('type') === 'price') {
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            _this.loadList();
        });
    },
    loadList: function() {
        let listHtml = '',
        _this = this, 
        listParam = this.data.listParam;
        $pListCon   = $('.p-list-con');
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        _product.getProductList(listParam, function(res) {
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function(errMsg) {
            _mm.errorTips(errMsg)
        })
    },
    loadPagination: function(pageInfo) {
        console.log(pageInfo);
        let _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum
                _this.loadList();
            }
        }))
    }   
};
$(function() {
    page.init();
})
