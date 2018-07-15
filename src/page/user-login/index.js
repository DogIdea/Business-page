require('./index.css');
require('page/common/nav-simple/index.js');
let _mm = require('util/mm.js');
let _user = require('service/user-service.js');

let formError = {
    show: function(errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('.error-item').hide().find('.err-msg').text('');
    }
};
let page = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        let _this = this;
        $("#submit").click(function() {
            _this.submit();
        });
        $('.user-content').keyup(function(e) {
            if(e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    submit: function() {
        let formDate = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
        },
        validateResult = this.formValidate(formDate);
        if(validateResult.status) {
            _user.login(formDate,function(res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            },function(errMsg) {
                formError.show(errMsg);
            });
        }else{
            formError.show(validateResult.msg);
        }
    },
    formValidate: function(formDate) {
        let result = {
            status: false,
            msg: ''
        };
        if(!_mm.validate(formDate.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formDate.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function() {
    page.init();
});