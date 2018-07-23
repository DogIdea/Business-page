let _mm = require('util/mm.js');
let _address={
    getAddressList: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50,
            },
            success: resolve,
            error: reject
        })
    }
}
module.exports= _address;