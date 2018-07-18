require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
let navSide = require('page/common/nav-side/index.js');
let _mm = require('util/mm.js');
let _user = require('service/user-service.js');
let templateIndex = require('./index.string');

let page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function() {
        let _this = this;
        $(document).on('click', '.btn-submit', function() {
            let userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status) {
                _user.updateUserInfo(userInfo, function(res,msg) {
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
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
    },
    onLoad: function() {
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo: function() {
        let userHtml = '';
        _user.getUserInfo(function(res) {
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg) {
            _mm.errTips(errMsg);
        })
    }
};
$(function() {
    page.init();
});