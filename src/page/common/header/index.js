require('./index.css');
let _mm = require('util/mm.js');

let header = {
    init: function() {
        this.bindEvent();
    },
    onLoad: function() {
        let keyword = _mm.getUrlParam('keyword');
        if(keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function() {
        let _this = this;
        $('#search-btn').click(function() {
            _this.searchSubmit();
        });
        $('#search-btn').keyup(function(e) {
            if(e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    searchSubmit: function() {
        let keyword = $.trim($('#search-input').val());
        if(keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            _mm.goHome();
        }
    }
}

module.exports = header.init();