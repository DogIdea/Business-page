let _mm = require('util/mm.js');
let _order={
    getProductList: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        })
    },
    createOrder: function(orderInfo,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        })
    },
    getOrderList: function(listParam,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        })
    },
    getOrderDetail: function(orderNumber,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/detail.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        })
    },
    cancelOrder: function(orderNumber,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        })
    }
}
module.exports= _order;