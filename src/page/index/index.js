'use strict';
require('../module.js');
require('./index.css');
let _mm = require('util/mm.js');
_mm.request({
    url: './test.do',
    success:function(res) {
        console.log(res);
    },
    error:function(errorMsg) {
        console.log(errorMsg);
    }
})