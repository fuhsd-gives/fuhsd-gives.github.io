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

    $('#about').css('top', -(window_height - $('.about-area').height() + (isMobile ? 0 : ($('header').outerHeight()))) / 2);

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
                        target = $('#' + this.hash.split('-')[1]);
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
                    } else if (this.hash.includes('refresh')) {
                        event.preventDefault();
                        target = $('#' + this.hash.split('-')[1]);
                        target.load(function () {
                            target.parent().animate({scrollTop: 0}, 250);
                        });
                        target.attr('src', target.attr('src'));
                    } else if (this.hash.includes('ignore')) {
                        event.preventDefault();
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
                break;
            case 'local':
                title = 'Community Non-Profits';
                text = '1 in 4 people are at risk of hunger in Silicon Valley. With school and business shut downs, the need to support vulnerable families at risk of hunger is more important than ever. Second Harvest is committed to distributing nutritious food to nearly every neighborhood in Silicon Valley and leveraging every available food resource. 1 in 10 people in Silicon Valley receives assistance from Second Harvest. West Valley Community Services and Sunnyvale Community Services work to help those that need financial assistance, including paying rent and utilities, assist with medical costs, purchasing emergency supplies, and more. These local organizations are an integral part of Silicon Valley, especially for families at risk.';
                break;
            case 'business':
                title = 'Small Business Relief';
                text = 'Opportunity Fund’s Small Business Relief Fund aims to raise support for small businesses impacted by the COVID-19 crisis — especially those run by women, people of color and immigrants. The Small Business Relief Fund provides relief to struggling self-employed and small business owners. Restaurant Workers’ Community Foundation is an advocacy and action nonprofit created by and for restaurant workers. The RCWF COVID-19 Fund will be used as listed: 50% for direct relief to individual restaurant workers, 25% for non-profit organizations serving restaurant workers in crisis, and 25% for zero-interest loans for restaurants to get back up and running.';
                break;
            default:
                window.alert('HUH????>>>');
        }
        modal.find('.modal-title').text(title);
        modal.find('.text-description').text(text);
    });

    $('#copyright').html('Copyright &copy;' + new Date().getFullYear() + ' All rights reserved | Made with <i aria-hidden="true" class="fa fa-heart-o"></i> by <a href="./" rel="noopener" target="_blank">Santa Clara Gives</a>\n');

    $('#pcComments').on('load', function () {
        if ($('#pcContainer').getNiceScroll().length == 0) {
            $('#pcContainer').niceScroll();
        } else {
            $('#pcContainer').getNiceScroll().resize();
        }
    });

    $('#mobileComments').on('load', function () {
        if ($('#mobileContainer').getNiceScroll().length == 0) {
            $('#mobileContainer').niceScroll();
        } else {
            $('#mobileContainer').getNiceScroll().resize();
        }
    });

    // Create IE + others compatible event handler
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    eventer(messageEvent, function (e) {
        var key = e.message ? "message" : "data";
        var data = e[key];
        if (("" + data).includes("donation-completed:")) {
            let body = JSON.parse(data.substring(data.indexOf(':') + 1));
            console.info(body);
            if (isMobile) {
                $('#donate > div.container > div.row.d-flex.justify-content-center > div.col-lg-6.contact-right').addClass('scale-in');
                setTimeout(function () {
                    let targe = $('#mobileComments');
                    targe.load(function () {
                        targe.parent().animate({scrollTop: 0}, 250);
                        setTimeout(function () {
                            $('#mobileContainer').getNiceScroll().resize();
                        }, 260);
                    });
                    targe.attr('src', targe.attr('src'));
                }, 1000)
            }
        }
    }, false);

    let zingQ = false;
    let zingShown = false;
    let pSpam = false;
    $("#leaderboard").inViewport(function (px) {
        if (px) {
            // console.info(px);
            if (zingchart && !zingShown && !pSpam) {
                // console.info("prevent spam pls");
                pSpam = true;
                loadGraph();
            } else {
                if (!zingQ && !pSpam) {
                    zingQ = true;
                    // console.info('setting listener');
                    $('#zing-src').on('load', function () {
                        if (!pSpam) {
                            pSpam = true;
                            loadGraph();
                        }
                    })
                }
            }
        }

        function loadGraph() {
            // console.info('loading graph');
            let respArr;
            $.ajax({
                url: "https://coinwar.santaclaragives.org/data",
                // url: "http://localhost:8080/data",
                method: "GET",
            }).done(function (data) {
                respArr = data.response;
                if (!respArr) {
                    setTimeout(function () {
                        pSpam = false;
                    }, 1000);
                    return;
                }
                respArr.sort((a, b) => (a.total > b.total) ? 1 : -1);
                createGraph();
                zingShown = true;
            }).fail(function (xhr) {
                console.error(xhr);
                setTimeout(function () {
                    pSpam = false;
                }, 1000);
            });

            function createGraph() {
                // console.info('calling create graph');

                let highestAmt = respArr[respArr.length - 1].total;

                let createLabel = (text, index) => {
                    return {
                        text: text,
                        fontColor: '#FFFFFF',
                        fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                        fontSize: '14px',
                        fontWeight: 'normal',
                        flat: true, // no event listener
                        hook: 'scale:name=scale-x;index=' + index + ';',
                        offsetX: '60px',
                        width: '110px',
                        shadow: false,
                        textAlign: 'left'
                    }
                };

                let graphConfig = {
                    type: 'hbar',
                    theme: 'dark',
                    plot: {
                        animation: {
                            delay: 500,
                            effect: 'ANIMATION_EXPAND_BOTTOM',
                            sequence: 0,
                            speed: 1800
                        },
                        stacked: true
                    },
                    plotarea: {
                        margin: 'dynamic',
                        backgroundColor: 'transparent'
                    },
                    backgroundColor: 'transparent',

                    scaleX: {
                        visible: false
                    },
                    scaleY: {
                        format: '$%v',
                        guide: {
                            visible: false
                        }
                    },
                    labels: respArr.map(function (obje, oIndex) {
                        if (+obje.total < highestAmt / 2) {
                            return createLabel(obje.school.substring(0, obje.school.indexOf(' ')), oIndex);
                        } else {
                            return createLabel(obje.school, oIndex);
                        }
                    }),
                    tooltip: {
                        text: '$%total'
                    },
                    series: [
                        {
                            values: respArr.map(function (obj) {
                                return +obj.total
                            }),
                            backgroundColor: '#4AC3B9 #6DAACE',
                            borderRadius: '0 6 6 0'
                        }
                    ]
                };
                zingchart.render({
                    id: 'leaderboard-bars',
                    data: graphConfig,
                    height: '100%',
                    width: '100%'
                });
            }


        }
    })
});

// Plugin @RokoCB :: Return the visible amount of px
// of any element currently in viewport.
// stackoverflow.com/questions/24768795/
;(function ($, win) {
    $.fn.inViewport = function (cb) {
        return this.each(function (i, el) {
            function visPx() {
                var H = $(this).height(),
                    r = el.getBoundingClientRect(), t = r.top, b = r.bottom;
                return cb.call(el, Math.max(0, t > 0 ? H - t : (b < H ? b : H)));
            }

            visPx();
            $(document).ready(visPx());
            $(win).on("resize scroll", visPx);
        });
    };
}($, window));