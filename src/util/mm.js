const Hogan = require('hogan');
let conf = {
    serverHost: ''
}
let _mm ={
    request: function(param){
        const _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res){
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }else if(10 === res.status) {
                    _this.doLogin();
                }else if(1 === res.status) {
                    typeof param.error === 'function' && param.error(err.msg);
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
        let value = $.trim(value);
        if('require' === type) {
            return !!vlaue;
        }
        if('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        if('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    doLogin: function() {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
    },
    goHome: function() {
        window.location.href = './index.html'
    }
};

module.exports = _mm;