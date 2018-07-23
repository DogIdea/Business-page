let _mm = require('util/mm.js');
let _order={
    getProductList: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        })
    }
}
module.exports= _order;