require('./index.css');
let _mm = require('util/mm.js');
let templateIndex = require('./index.string')

let navSide={
    option: {
        name: '',
        navList: [
            {name: 'user-center',desc: '个人中心',href: './user-center.html'},
            {name: 'order-list',desc: '我的订单',href: './order-list.html'},
            {name: 'pass-update',desc: '修改密码',href: './pass-update.html'},
            {name: 'about',desc: '关于BUSINESS',href: './about.html'}
        ]
    },
    init: function(option) {
      $.extend(this.option, option);
      this.renderNav();  
    },
    renderNav: function() {
        for(let i=0, iLength = this.option.navList.length; i<iLength; i++){
            if(this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive =true;
            }
        };
        let navHtml = _mm.renderHtml(templateIndex, {
            navList: this.option.navList
        });
        $('.nav-side').html(navHtml);
    }
}

module.exports = navSide;