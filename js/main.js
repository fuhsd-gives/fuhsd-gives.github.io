$(document).ready(function () {
    "use strict";

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

    $('#about').css('top', -(window_height - $('.about-area').height() + ($(window).width() < 576 ? 0 : ($('header').outerHeight()))) / 2);

    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, {duration: 1000, easing: 'swing'}, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }

                    });
                } else if (this.hash) {
                    if (this.hash.includes('cModal')) {
                        event.preventDefault();
                        target = $('#'+this.hash.split('-')[1]);
                        $('.modal').modal('hide');
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, {duration: 1000, easing: 'swing'}, function () {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) { // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            }

                        });
                    }
                }
            }
        });

    $('#projectModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var project = button.data('project'); // Extract info from data-* attributes
        var modal = $(this);
        var title;
        var text;
        var els;
        switch (project) {
            case 'medical':
                title = 'Medical Supplies';
                text = 'In the U.S., Direct Relief is delivering protective masks – along with exam gloves and isolation gowns – to health care organizations in areas with confirmed COVID-19 cases. In China, Direct Relief has delivered nearly 800,000 N95 and surgical masks, more than 400,000 gloves, and numerous coveralls, face shields, and shoe covers. The County of Santa Clara Health System – comprising Santa Clara Valley Medical Center Hospital & Clinics, O’Connor Hospital, St Louise Regional Hospital, Santa County County Public Health Department and other affiliated agencies  – is the largest provider of essential health services to vulnerable populations in our region. VMC Foundation is calling on the community to support our care providers with donations of funds and supplies.';
                els = '<p>Valley Medical Center Foundation: </p>'
                    + '<a href="https://vmcfoundation.org/" target="_blank">https://vmcfoundation.org/ </a>'
                    + '<p>DirectRelief:</p>'
                    + '<a href="https://www.directrelief.org/" target="_blank">https://www.directrelief.org/</a>';
                break;
            case 'local':
                title = 'Community Non-Profits';
                text = '1 in 4 people are at risk of hunger in Silicon Valley. With school and business shut downs, the need to support vulnerable families at risk of hunger is more important than ever. Second Harvest is committed to distributing nutritious food to nearly every neighborhood in Silicon Valley and leveraging every available food resource. 1 in 10 people in Silicon Valley receives assistance from Second Harvest. West Valley Community Services and Sunnyvale Community Services work to help those that need financial assistance, including paying rent and utilities, assist with medical costs, purchasing emergency supplies, and more. These local organizations are an integral part of Silicon Valley, especially for families at risk.';
                els = '<p>West Valley Community Services:</p>'
                    + '<a href="https://www.wvcommunityservices.org/" target="_blank">https://www.wvcommunityservices.org/</a>'
                    + '<p>Second Harvest Food Bank:</p>'
                    + '<a href="https://www.shfb.org/" target="_blank">https://www.shfb.org/</a>'
                    + '<p>Sunnyvale Community Services:</p>'
                    + '<a href="https://svcommunityservices.org/ " target="_blank">https://svcommunityservices.org/ </a>';
                break;
            case 'business':
                title = 'Small Business Relief';
                text = 'Opportunity Fund’s Small Business Relief Fund aims to raise support for small businesses impacted by the COVID-19 crisis — especially those run by women, people of color and immigrants. The Small Business Relief Fund provides relief to struggling self-employed and small business owners. Restaurant Workers’ Community Foundation is an advocacy and action nonprofit created by and for restaurant workers. The RCWF COVID-19 Fund will be used as listed: 50% for direct relief to individual restaurant workers, 25% for non-profit organizations serving restaurant workers in crisis, and 25% for zero-interest loans for restaurants to get back up and running.';
                els = '<p>Opportunity Fund: </p>'
                    + '<a href="https://www.opportunityfund.org/small-business-relief-fund/ " target="_blank">https://www.opportunityfund.org/small-business-relief-fund/ </a>'
                    + '<p>Restaurant Workers’ Community Foundation: </p>'
                    + '<a href="https://www.restaurantworkerscf.org/ " target="_blank">https://www.restaurantworkerscf.org/ </a>';
                break;
            default:
                window.alert('HUH????>>>');
        }
        modal.find('.modal-title').text(title);
        modal.find('.text-description').text(text);
        modal.find('.links').html(els);
    });

    $('#copyright').html('Copyright &copy;' + new Date().getFullYear() + ' All rights reserved | Made with <i aria-hidden="true" class="fa fa-heart-o"></i> by <a href="./" rel="noopener" target="_blank">FUHSD Gives</a>\n');

    $('#donateForm').on('load', function () {

    });

});
