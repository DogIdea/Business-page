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
    data: {
        username: '',
        question: '',
        answer: '',
        token: '',
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadStepUsername();
    },
    bindEvent: function() {
        let _this = this;
        $("#submit-username").click(function() {
            let username = $.trim($('#username').val());
            if(username) {
                _user.getQuestion(username, function(res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入用户名');
            }
        });
        $("#submit-question").click(function() {
            let answer = $.trim($('#answer').val());
            if(answer) {
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入密码提示问题答案');
            }
        });
        $("#submit-password").click(function() {
            let password = $.trim($('#password').val());
            if(password && password.length >= 6) {
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function(res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入不少于6位的新密码');
            }
        });
    },
    loadStepUsername: function() {
        $('.step-username').show();
    },
    loadStepQuestion: function() {
        formError.hide();
        $('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
    },
    loadStepPassword: function() {
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show();
    }
};
$(function() {
    page.init();
});