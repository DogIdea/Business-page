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
        let _this = this;
        $(document).on('mouseenter', '.p-img-item', function() {
            let imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        $(document).on('click', '.p-count-btn', function() {
            let type = $(this).hasClass('plus') ? 'plus' : 'minus',
            $pCount = $('.p-count'),
            currCount = parseInt($pCount.val()),
            minCount = 1,
            maxCount = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        $(document).on('click', '.cart-add', function() {
            _cart.addToCart({
                productId : _this.data.productId,
                count : $('.p-count').val()
            }, function(res) {
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            })
        });
    },
    loadDetail: function() {
        let _this = this,
        html = '',
        $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _product.getProductDetail(this.data.productId, function(res) {
            _this.filter(res);
            _this.data.detailInfo = res;
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
