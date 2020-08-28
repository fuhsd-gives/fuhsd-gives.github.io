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
    // $('select').niceSelect();


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
        .not('[href="#projectsContainer"]')
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
                        if (!this.hash.split('-')[1]) {
                            $('.modal').modal('hide');
                            return;
                        }
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
                    } else if (this.hash.includes('share')) {
                        event.preventDefault();
                        let target = this.hash.split('-')[1];
                        if (target == 'wechat') {
                            if (isMobile) {

                            } else {

                            }
                        }
                    }
                }
            }
        });

    var url = window.location.href;
    if (url.includes('#share')) {
        setTimeout(function () {
            $('#shareModal').modal();
        }, 500);
    }

    if (isMobile) {
        let $pContainer = $('#projectsContainer');
        $('.project-area .project-wrap .details').carouselHeights();

        $pContainer.data('ride', 'carousel').data('interval', 8000).addClass('slide').addClass('carousel');
        $('#projectsContainer > div > div > div > a > div').addClass('not-mobile');
        $('#projectsContainer > div > div > div >  div').addClass('not-mobile');
        $('#projectsContainer > div > div > div > a ').not('[href="#projectsContainer"]').off('click');
        $('#projectsContainer > div > div > div > a ').not('[href="#projectsContainer"]').on('click', function (event) {
            event.preventDefault();
            return false;
        });
        $('#projectsContainer > .project-wrap').addClass('carousel-item').wrapAll("<div class='carousel-inner' />").first().addClass('active')

        let projectsCarouselWP = new Waypoint({
            element: $pContainer.get()[0],
            handler: function () {
                $pContainer.carousel();

                this.destroy();
            },
            offset: function () {
                return 600
            }
        });

        $pContainer.on("touchstart", function (event) {
            var xClick = event.originalEvent.touches[0].pageX;
            $(this).one("touchmove", function (event) {
                var xMove = event.originalEvent.touches[0].pageX;
                if (Math.floor(xClick - xMove) > 5) {
                    $(this).carousel('next');
                } else if (Math.floor(xClick - xMove) < -5) {
                    $(this).carousel('prev');
                }
            });
            $pContainer.on("touchend", function () {
                $(this).off("touchmove");
            });
        });
    }

    let venmoWP = new Waypoint({
        element: $('#donateForm').get()[0],
        handler: function () {
            $('.side-venmo').css('display', 'block').animate({
                opacity: 1
            }, 1000);
            $('.x-out').on('click', function(){
                $('.side-venmo').animate({
                    opacity: 0
                }, 500, function(){
                    this.css('display', 'none')
                });
            });
            setTimeout(function(){
                $('.side-venmo').animate({
                    opacity: 0
                }, 1000, function(){
                    $('.side-venmo').css('display', 'none')
                });
            }, 15000);
            this.destroy();
        },
        offset: function () {
            return 800 + isMobile?600:0
        }
    });

    $('#shareModal').on('show.bs.modal', function (event) {
        setTimeout(function () {
            let $taEl = $('#shareMessage');
            $taEl.height(1);
            $taEl.animate({
                height: (2 + $taEl.get(0).scrollHeight)
            }, 1000);
        }, 510);
    });

    $('[aria-label^="Share"]').on('click', function (event) {
        let urlSafe = encodeURIComponent($('#shareMessage').val());
        $(this).attr('href', $(this).attr('href').replace('[REPLACE_THIS]', urlSafe));
        return true;
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
                text = 'The County of Santa Clara Health System – comprising Santa Clara Valley Medical Center Hospital & Clinics, O’Connor Hospital, St Louise Regional Hospital, Santa County County Public Health Department and other affiliated agencies  – is the largest provider of essential health services to vulnerable populations in our region. Santa Clara\'s VMC Foundation is calling on the community to support our care providers with donations of funds and supplies.  Like in any disaster, the best way to help is by making a financial contribution.  Donations will allow the <b style="color: unset; font-weight: 600">Valley Medical Center Foundation</b> to respond to emergency needs from physicians, first responders and local public health officials.';
                break;
            case 'local':
                title = 'Local Food Bank';
                text = 'A record number of kids, families and seniors rely on <b style="color: unset; font-weight: 600">Second Harvest</b> for food every month, and the number is growing. It’s hard to imagine the pain of not being able to feed your family, or going to school on an empty stomach. But the reality is more than 1 in 4 people is at risk of hunger in Silicon Valley. The booming economy has sent the cost of housing soaring, leaving many families and seniors with little left over for food. Even those we depend on to make our community run can’t afford to pay for housing and put nutritious food on the table — cooks, cashiers, health care workers and teachers. With school and business shut downs, the need to support vulnerable families at risk of hunger is more important than ever. Second Harvest is committed to distributing nutritious food to nearly every neighborhood in Silicon Valley and leveraging every available food resource.';
                break;
            case 'business':
                title = 'Small Business Relief';
                text = 'The economic and personal impacts from the COVID-19 pandemic are increasingly devastating for individuals, families and small businesses across the U.S. Even before a crisis like this, nearly half of the nation’s 30 million small businesses only have enough cash on hand to operate for 15 days without customers. If they shut down, paychecks for millions of workers are in jeopardy, which will have serious impacts on their families, communities and our economy as a whole. <b style="color: unset; font-weight: 600">Opportunity Fund’s Small Business Relief Fund</b> aims to raise support for small businesses impacted by the COVID-19 crisis — especially those run by women, people of color and immigrants. The Small Business Relief Fund provides relief to struggling self-employed and small business owners.';
                break;
            default:
                window.alert('HUH????>>>');
        }
        modal.find('.modal-title').text(title);
        modal.find('.text-description').html(text);
    });

    $('#copyright').html('Copyright &copy;' + new Date().getFullYear() + ' All rights reserved | Made with <i aria-hidden="true" class="fa fa-heart-o"></i> by <a href="./" rel="noopener" target="_blank">Santa Clara Gives</a>\n');

    $('#pcComments').on('load', function () {
        if ($('#pcContainer').getNiceScroll().length == 0) {
            $('#pcContainer').niceScroll();
        } else {
            $('#pcContainer').getNiceScroll().resize();
        }

        if (!isMobile && $('.not-mobile.fade-gradient-bottom').width() == 0) {
            $('.not-mobile.fade-gradient-bottom').css('width', $(this).width());
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
            // console.info(body);
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
                }, 1000);
                setTimeout(function () {
                    if (isMobile) {
                        $('.after-donate').css({
                            display: 'unset'
                        });
                        $('.after-donate').animate({
                            opacity: 1,
                        }, 1000);
                    }
                }, 500);
            } else {
                setTimeout(function () {
                    $('#shareModal').modal('show');
                }, 1000);
            }
        }
    }, false);

    let zingQ = false;
    let zingShown = false;
    let pSpam = false;

    var cUpOptions = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
    };
    let cUpArr = $('[data-count-up].past-stat').each(function () {
        let countUp = new CountUp(this, 0, $(this).data('count-up'), 0, 3, cUpOptions);
        countUp.start();
    });


    let leaderboardWaypoint = new Waypoint({
        element: $('#leaderboard').get()[0],
        handler: function () {
            if (!pSpam) {
                // console.info("prevent spam pls");
                pSpam = true;
                // console.info('setting prevent spam');
                loadGraph();
                this.destroy();
            }
        },
        offset: function () {
            return 600
        }
    });

    let count_loadGraph = 0;

    function loadGraph() {
        // console.info('loading graph');
        let respArr;
        $.ajax({
            url: "https://coinwar.santaclaragives.org/data",
            // url: "http://localhost:8080/data",
            // url: "https://cors-anywhere.herokuapp.com/https://coinwar.santaclaragives.org/data",
            method: "GET",
        }).done(function (data) {
            respArr = data.response;
            if (!data || (!respArr && !JSON.parse(data).response)) {
                setTimeout(function () {
                    if (data.status === 503) {
                        setTimeout(function () {
                            if (count_loadGraph++ < 5) {
                                loadGraph();
                            }
                        }, 2000);
                    }
                    pSpam = false;
                }, 1000);
                return;
            }
            if (!respArr) {
                respArr = JSON.parse(data).response;
                //loaded from cache
            }
            respArr.sort((a, b) => (a.total > b.total) ? 1 : -1);
            createGraph();
            zingShown = true;
        }).fail(function (xhr) {
            if (xhr.status === 503) {
                setTimeout(function () {

                    if (count_loadGraph++ < 5) {
                        loadGraph()
                    }

                }, 2000);
            } else {
                console.error(xhr);
                setTimeout(function () {
                    pSpam = false;
                }, 1000);
            }
        });

        function createGraph() {
            // console.info('calling create graph');

            let highestAmt = respArr[respArr.length - 1].total;

            let createLabel = (text, index) => {
                // console.info('creating label', text);
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
                        if(obje.school.includes(' ')){
                            return createLabel(obje.school.substring(0, obje.school.indexOf(' ')), oIndex);
                        }else{
                            return createLabel(obje.school.substring(0, 7) + (obje.school.length > 7 ? '...': ''), oIndex);
                        }
                    } else {
                        return createLabel(obje.school, oIndex);
                    }
                }),
                tooltip: {
                    text: '$%total',
                    offsetY: -2
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

    let scrollableDiv = $('.not-mobile.force-scroll');
    $('.fade-gradient-bottom').on('mousewheel', function (e) {
        e.preventDefault();

        scrollableDiv.scrollTop(scrollableDiv.scrollTop() + e.originalEvent.deltaY);
    });

    $('#standingsModal').on('shown.bs.modal', function () {
        $('#standings-table').bootstrapTable('resetView')
    });


    let clipboard = new ClipboardJS('.btn-clipboard', {
        container: document.getElementById('shareModal')
    });
});

let count_loadTable = 0;

function tableAjaxRequest(params) {
    let tableDataUrl = 'https://coinwar.santaclaragives.org/standings';
    // let tableDataUrl = 'http://localhost:8080/standings';
    $.ajax({
        url: tableDataUrl,
        method: "GET",
    }).done(function (data) {
        if (data.status === 503) {
            setTimeout(function () {
                if (count_loadTable++ < 5) {
                    tableAjaxRequest(params)
                }
            }, 2000);
        } else {
            if (typeof data === 'string') {
                data = JSON.parse(data);
                if (data.status === 503) {
                    setTimeout(function () {
                        if (count_loadTable++ < 5) {
                            tableAjaxRequest(params)
                        }
                    }, 2000);
                } else {
                    params.success(data);
                }
            } else {
                params.success(data);
            }
        }
    }).fail(function (xhr) {
        if (xhr.status === 503) {
            setTimeout(function () {
                if (count_loadTable++ < 5) {
                    tableAjaxRequest(params)
                }
            }, 2000);
        } else {
            console.error(xhr);
            params.success([]);
        }
    });

    $('#shareMessage').val(
        'Hi all, it can be so easy to feel helpless amid this pandemic, but we can make a meaningful impact as a community. Santa Clara Gives is partnering with Bay Echo, a 501(c)(3) nonprofit, to support our local businesses and nonprofits that need financial help due to COVID-19. Your tax-deductible donation will go to Second Harvest Food Bank, Valley Medical Center Foundation, and Opportunity Fund\'s Small Business Relief Fund.\n' +
        '--\n' +
        'Together, we will weather this storm.\n' +
        'https://santaclaragives.org\n'
    );

    // Normalize Carousel Heights - pass in Bootstrap Carousel items.
    $.fn.carouselHeights = function() {

        var items = $(this), //grab all slides
            heights = [], //create empty array to store height values
            tallest; //create variable to make note of the tallest slide

        var normalizeHeights = function() {

            items.each(function() { //add heights to array
                heights.push($(this).outerHeight(true));
            });
            tallest = Math.max.apply(null, heights); //cache largest value
            items.each(function() {
                $(this).css('height',(tallest + 10) + 'px');
            });
        };

        normalizeHeights();

        $(window).on('resize orientationchange', function () {
            //reset vars
            tallest = 0;
            heights.length = 0;

            items.each(function() {
                $(this).css('min-height','0'); //reset min-height
            });
            normalizeHeights(); //run it again
        });

    };
}

function checkVisible(elm) {
    var recta = elm.getBoundingClientRect();
    var viewHeighta = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(recta.bottom < 0 || recta.top - viewHeighta >= 0);
}


function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (2 + o.scrollHeight) + "px";
}