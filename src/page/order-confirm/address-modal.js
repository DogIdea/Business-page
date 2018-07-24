let _mm = require('util/mm.js');
let _cities = require('util/cities/index.js');
let _address = require('service/address-service.js')
let templateAddressModal = require('./address-modal.string');


let addressModal={
    show: function(option) {
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        this.loadModal();
        this.bindEvent();
    },
    bindEvent: function() {
        let _this = this;
        this.$modalWrap.find('#receiver-province').change(function() {
            let selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        this.$modalWrap.find('.address-btn').click(function() {
            let receiverInfo = _this.getReceiverInfo(),
            isUpdate = _this.option.isUpdate;
            if(!isUpdate && receiverInfo.status) {
                _address.save(receiverInfo.data, function(res) {
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                })
            }else if(isUpdate && receiverInfo.status) {
                _address.update(receiverInfo.data, function(res) {
                    _mm.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                })
            }else {
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了');
            }
        });
        this.$modalWrap.find('.modal-container').click(function(e) {
           e.stopPropagation();
        });
        this.$modalWrap.find('.close').click(function() {
            _this.hide();
        });

    },
    loadModal: function() {
        let addressModalHtml = _mm.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        })
        this.$modalWrap.html(addressModalHtml);
        this.loadProvince();
    },
    loadProvince: function() {
        let provinces = _cities.gitProvinces() || [],
        $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        if(this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities: function(provinceName) {
        let cities = _cities.getCities(provinceName) || [],
        $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        if(this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    getReceiverInfo: function () {
        let receiverInfo = {},
        result = {
            status: false
        };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());
        if(this.option.isUpdate) {
            receiverInfo.id = $.trim(this.$modalWrap.find('#receiver-id').val());
        };
        if(!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        }else if(!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        }else if(!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        }else if(!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人详细地址';
        }else if(!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号';
        }else {
            result.status = true;
            result.data = receiverInfo;
        };
        return result;
    },
    getSelectOption: function(optionArray) {
        let html = '<option value="">请选择</option>';
        for(let i = 0, length = optionArray.length; i < length ; i++) {
            html += '<option value="'+ optionArray[i] +'">'+ optionArray[i] +'</option>';
        }
        return html;
    },
    hide: function() {
        this.$modalWrap.empty();
    }
};
module.exports= addressModal;