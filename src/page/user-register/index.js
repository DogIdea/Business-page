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
        $('#username').blur(function() {
            let username = $.trim($(this).val());
            if(!username) {
                return;
            }
            _user.checkUsername(username, function(res) {
                formError.hide();
            },function(errMsg) {
                formError.show(errMsg);
            })
        })
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
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        },
        validateResult = this.formValidate(formDate);
        if(validateResult.status) {
            _user.register(formDate,function(res) {
                window.location.href = './result.html?type=register';
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
        if(formDate.password.length <6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if(formDate.password !==formDate.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result; 
        }
        if(!_mm.validate(formDate.phone, 'phone')) {
            result.msg = '手机格式不正确';
            return result;
        }
        if(!_mm.validate(formDate.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if(!_mm.validate(formDate.question, 'require')) {
            result.msg = '密码提示不能为空';
            return result;
        }
        if(!_mm.validate(formDate.answer, 'require')) {
            result.msg = '密码提示答案不能为空';
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