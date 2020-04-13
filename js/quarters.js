$(document).ready(function () {
    "use strict";

    let isMobile = $(window).width() < 576;

    var window_width = $(window).width(),
        window_height = window.innerHeight,
        header_height = $(".default-header").height(),
        header_height_static = $(".site-header.static").outerHeight(),
        fitscreen = window_height - header_height;

    $(".fullscreen").css("height", window_height);
    $(".fitscreen").css("height", fitscreen);

    //-------- Active Sticky Js ----------//
    $('#tmpSticky').css('display', 'none');
    $(".default-header").sticky({topSpacing: 0});


    //------- Active Nice Select --------//
    $('select').niceSelect();


    // -------   Active Mobile Menu-----//

    $(".menu-bar").on('click', function (e) {
        e.preventDefault();
        $("nav").toggleClass('hide');
        $("span", this).toggleClass("lnr-menu lnr-cross");
        $(".main-menu").addClass('mobile-menu');
    });

    $('.nav-item a:first').tab('show');

    $('#copyright').html('Copyright &copy;' + new Date().getFullYear() + ' All rights reserved | Made with <i aria-hidden="true" class="fa fa-heart-o"></i> by <a href="./" rel="noopener" target="_blank">Santa Clara Gives</a>\n');

    $.getJSON("/quarters/index.json", function (data) {
        if (!data.quarters) {
            console.error('navigation error');
            $('.side-bar').css('display', 'none');
        }
        for (let i = 0; i < data.quarters.length; i++) {
            let hrefStrings = '';
            for (let j = 0; j < data.quarters[i].quarters.length; j++) {
                hrefStrings += '<a  href="/quarters/'+data.quarters[i].year+'/q' + data.quarters[i].quarters[j] + '">' +
                    '            Quarter ' + data.quarters[i].quarters[j] +
                    '        </a>'
            }
            $('.side-bar').append(
                '<div>' +
                data.quarters[i].year +
                hrefStrings +
                '</div>'
            )
        }

        let pName = window.location.pathname;
        pName = pName.substr(0, pName.length-1);
        $('.side-bar > div > a[href="'+pName+'"]').addClass('active');
    });

    let toggleSBar = false;
    let $toggleSwitch = $('.side-bar > [href^=javascript]');

    $toggleSwitch.on('click', function () {
        if (!toggleSBar) {
            $('.side-bar > div:not(.no-hide)').each(function () {
                let $this = $(this);
                $this.data('height', $this.css('height'));
                $this.data('padding', $this.css('padding'));
                $this.css('opacity', '0').animate({
                    height: 0,
                    padding: 0
                }, 800);
            });
            if(isMobile){
                $('.side-bar').animate({
                    'padding': '10px',
                    'right': -$('.side-bar').width()
                }, 800, function(){
                    toggleSBar = true;
                });
            }else{
                $('.side-bar').animate({
                    'right': -$('.side-bar').width()
                }, 800, function () {
                    toggleSBar = true;
                });
            }
            $toggleSwitch.text('<')
        } else {
            $('.side-bar > div:not(.no-hide)').each(function () {
                let $this = $(this);
                $this.animate({
                    opacity: 1,
                    height: $this.data('height'),
                    padding: $this.data('padding')
                }, 800);
            });
            $('.side-bar').animate({
                'right': "1.5vw",
                'padding': "20px"
            }, 800, function () {
                toggleSBar = false;
            });
            $toggleSwitch.text('>')
        }
    });

});