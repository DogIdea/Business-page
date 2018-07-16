const Hogan = require('hogan');
let conf = {
    serverHost: ''
}
let _mm ={
    // 强制登录版
    // request: function(param){
    //     const _this = this;
    //     $.ajax({
    //         type: param.method || 'get',
    //         url: param.url || '',
    //         dataType: param.type || 'json',
    //         data: param.data || '',
    //         success: function(res){
    //             if(0 === res.status){
    //                 typeof param.success === 'function' && param.success(res.data, res.msg);
    //             }else if(10 === res.status){
    //                 _this.goHome();
    //             }else if(1 === res.status){
    //                 typeof param.error === 'function' && param.error(res.msg);
    //             }
    //         },
    //         error: function(err){
    //             typeof param.error === 'function' && param.error(err.statusText);
    //         }
    //     });
    // },
    request: function(param){
        const _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res){
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    getServerUrl: function(path) {
        return conf.serverHost + path;
    },
    getUrlParam: function(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    renderHtml: function(htmlTemplate,data) {
        let template = Hogan.compile(htmlTemplate),
        result = template.render(data);
        return result;
    },
    successTips: function(msg) {
        alert(msg || '操作成功！');
    },
    errorTips: function(msg) {
        alert(msg || '哪里不对了！');
    },
    validate: function(value,type) {
        let _value = $.trim(value);
        if('require' === type) {
            return !! _value;
        }
        if('phone' === type) {
            return /^1\d{10}$/.test(_value);
        }
        if('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(_value);
        }
    },
    doLogin: function() {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
    },
    goHome: function() {
        window.location.href = './index.html'
    }
};

module.exports = _mm;