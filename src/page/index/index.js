require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('util/slider/index.js');
let navSide = require('page/common/nav-side/index.js');
let templateBanner = require('./index.string');
let _mm = require('util/mm.js');
$(function() {
    let bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml)
    let $slider = $('.banner').unslider({
        dots: true
    });
    $('.banner-con .banner-arrow').click(function() {
        let forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    })
})