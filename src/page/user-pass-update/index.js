require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
let navSide = require('page/common/nav-side/index.js');
let _mm = require('util/mm.js');
let _user = require('service/user-service.js');

let page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent: function() {
        let _this = this;
        $(document).on('click', '.btn-submit', function() {
            let userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status) {
                _user.updatePassword({
                  passwordOld: userInfo.password,
                  passwordNew: userInfo.passwordNew
                }, function(res,msg) {
                    _mm.successTips(msg);
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                _mm.errorTips(validateResult.msg);
            }
        })
    },
    validateForm: function(formDate) {
        let result = {
            status: false,
            msg: ''
        };
        if(!_mm.validate(formDate.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        if(!formDate.passwordNew || formDate.passwordNew.length < 6) {
            result.msg = '新密码长度不得少于6位';
            return result;
        }
        if(formDate.passwordNew !== formDate.passwordConfirm) {
            result.msg = '两次的密码不一致';
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