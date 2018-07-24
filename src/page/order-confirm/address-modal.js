let _mm = require('util/mm.js');
let _cities = require('util/cities/index.js');
let _address = require('service/address-service.js')
let templateAddressModal = require('./address-modal.string');


let addressModal={
    show: function(option) {
        this.option = option;
        this.$modalWrap = $('.modal-wrap');
        this.loadModal();
        this.bindEvent();
    },
    bindEvent: function() {
        let _this = this;
        this.$modalWrap.find('#receiver-province').change(function() {
            let selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        })
    },
    loadModal: function() {
        let addressModalHtml = _mm.renderHtml(templateAddressModal, this.option.data)
        this.$modalWrap.html(addressModalHtml);
        this.loadProvince();
        this.loadCities();
    },
    loadProvince: function() {
        let provinces = _cities.gitProvinces() || [],
        $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
    },
    loadCities: function(provinceName) {
        let cities = _cities.getCities(provinceName) || [],
        $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
    },
    getSelectOption: function(optionArray) {
        let html = '<option value="">请选择</option>';
        for(let i = 0, length = optionArray.length; i < length ; i++) {
            html += '<option value="'+ optionArray[i] +'">'+ optionArray[i] +'</option>';
        }
        return html;
    },
    hide: function() {

    }
};
module.exports= addressModal;