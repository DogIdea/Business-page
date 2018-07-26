let _mm = require('util/mm.js');
let _payment={
    getpaymentInfo: function(orderNumber,resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        })
    },
    getPaymentStatus: function(orderNumber,resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        })
    }
}
module.exports= _payment;