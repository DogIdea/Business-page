require('./index.css');
require('page/common/header/index.js');
let _mm = require('util/mm.js');
let _cart = require('service/cart-service.js');
let templateIndex = require('./index.string');
let nav = require('page/common/nav/index.js');

let page = {
    data: {
        
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadCart();
    },
    bindEvent: function() {
        let _this = this;
        $(document).on('click', '.cart-select', function() {
            let $this = $(this),
            productId = $this.parents('.cart-table').data('product-id');
            if($this.is(':checked')) {
                _cart.selectProduct(productId, function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                })
            }else {
                _cart.unselectProduct(productId, function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                })
            }
        });
        $(document).on('click', '.cart-select-all', function() {
            let $this = $(this);
            if($this.is(':checked')) {
                _cart.selectAllProduct(function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                })
            }else {
                _cart.unselectAllProduct(function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                })
            }
        });
        $(document).on('click', '.count-btn', function() {
            let $this = $(this),
            $pCount = $this.siblings('.count-input'),
            currCount = parseInt($pCount.val()),
            type = $this.hasClass('plus') ? 'plus' :'minus',
            productId = $this.parents('.cart-table').data('product-id'),
            minCount = 1,
            maxCount = parseInt($pCount.data('max')),
            newCount = 0;
            if(type === 'plus') {
                if(currCount >= maxCount) {
                    _mm.errorTips('该商品数量达到上限');
                    return;
                }
                newCount = currCount + 1;
            }else if(type === 'minus') {
                if(currCount === minCount) {
                    return;
                }
                newCount = currCount - 1;
            }
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function(res) {
                _this.renderCart(res);
            }, function(errMsg) {
                _this.showCartError();
            })
        });
        $(document).on('click', '.cart-delete', function() {
            if(window.confirm('确认要删除该商品')) {
                let productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        $(document).on('click', '.delete-selected', function() {
            if(window.confirm('确认要删除该商品')) {
                let arrProductIds = [],
                $selectedItem = $('.cart-select:checked');
                for(let i = 0,iLength = $selectedItem.length; i < iLength ; i++){
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));
                }else {
                    _mm.errorTips('您还没有选中要删除的商品');
                }
            }
        });
        $(document).on('click', '.btn-submit', function() {
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './order-confirm.html';
            }else {
                _mm.errorTips('请选择商品后再提交');
            }
        });
    },
    loadCart: function() {
        let _this = this;
        _cart.getCartList(function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartError();
        })
      
    },
    renderCart: function(data) {
        this.filter(data);
        this.data.cartInfo = data;
        let cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        nav.loadCartCount();
    },
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showCartError: function() {
        $('.page-wrap').html('<p class="err-tip">哪里不对了，请刷新。</p>')
    },
    deleteCartProduct: function(productIds) {
        let _this = this;
        _cart.deleteProduct(productIds, function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartError();
        })
    }
};
$(function() {
    page.init();
})
