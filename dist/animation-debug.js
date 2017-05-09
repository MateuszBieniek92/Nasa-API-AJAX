$(function () {

    ///media queries

    var mobile = window.matchMedia("screen and (max-width: 599px)");
    var desktop = window.matchMedia("screen and (min-width: 900px)");
    var tablet = window.matchMedia("screen and (min-width: 600px) and (max-width: 899px)");

    /// nasa parameters

    var nasaUrl = 'https://api.nasa.gov/planetary/apod?api_key=YJxJW0IUSKxKADo5NqCyWhDkKWnchFkXGm06sTfW&date=';
    var marsUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-6-3&api_key=YJxJW0IUSKxKADo5NqCyWhDkKWnchFkXGm06sTfW';

    /// section 1 btns
    var $photoUl = $('.photo');
    var $btnLeft = $('.btnLeft');
    var $btnRight = $('.btnRight');
    var $nasaText = $('.text');
    var $sectionOne = $('.sectionOne');
    var $btnScroll = $('.btnBottom');

    /// loader divs
    var $loadBackground = $('<div class="load">');
    var $loaderContainer = $('<div class="loaderContainer">');
    var $loader = $loaderContainer.append('<div class="loader">');

    /// slider array and index
    var $array = $photoUl.find('li');
    var $position = $array.index($('.visible'));
    var $arrayLength = $array.length;

    // section 2
    var $galleryUl = $('.gallery');
    var $sectionTwo = $('.sectionTwo');

    //console.log($arrayLength);
    //console.log('tablica: ' + $array);
    $position = 0;

    // scroll btn 
    $(window).on('scroll', function () {
        var pix = $(document).scrollTop();
        //console.log(pix);
        $btnScroll.show();
        if (pix !== 0) {
            $btnScroll.hide();

        }
    });

    var sectionTwoTop = $sectionTwo.offset();
    // console.log(test);

    function scrollTop() {

            $btnScroll.on('click', function () {
                $('html, body').animate({
                    scrollTop: sectionTwoTop.top
                }, 2000);
            });
        }
    


    //functions 

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomDate() {
        var year = randomInt(2005, 2016);
        var month = randomInt(1, 12);
        var day = randomInt(1, 28);

        return year + '-' + month + '-' + day;
    }

    function setSectionOneWidth() {
        $sectionOne.width();
    }

    function slide() {
        initLoader();
        $array.eq($position).css('opacity', 0);
        $('.visible').animate({
            opacity: 0
        }, 2000, function () {
            $(this).removeClass('visible');
            $array.eq($position).addClass('visible').animate({
                opacity: 1
            }, 2000);
        })
    }

    function initLoader() {
        $sectionOne.append($loadBackground);
        $sectionOne.append($loaderContainer);
        $sectionOne.append($loader);
        $loader.delay(500).fadeIn('slow');
        $loadBackground.delay(500).fadeIn('slow');
    }

    function stopLoader() {
        $sectionOne.prepend($loadBackground);
        $sectionOne.prepend($loaderContainer);
        $sectionOne.prepend($loader);
        $loader.fadeOut("slow");
        $loadBackground.fadeOut("slow");
    }

    function rightButton() {
        var widthNext = $btnRight.outerWidth();
        time = 500;
        if (mobile.matches) {
            $btnRight
                .on('click', function () {
                    $position += 1;
                    start('next');
                    slide();
                    //console.log($position);
                    $nasaText.addClass('visible').animate({
                        opacity: 0
                    }, time);
                })
        } else {
            $btnRight
                .on('mouseenter', function () {
                    $(this).stop().animate({
                        right: 35 + 'px'
                    }, time);
                })
                .on('mouseout', function () {
                    $(this).stop().animate({
                        right: -20 + 'px'
                    }, time);
                })
                .on('click', function () {
                    $position += 1;
                    start('next');
                    slide();
                    //console.log($position);
                    $nasaText.addClass('visible').animate({
                        opacity: 0
                    }, time);
                })
        }
    };

    function leftButton() {
        time = 500;
        var widthPrev = $btnLeft.outerWidth();
        if (mobile.matches) {
            $btnLeft
                .on('click', function () {
                    $position += 1;
                    start('next');
                    slide();
                    //console.log($position);
                    $nasaText.addClass('visible').animate({
                        opacity: 0
                    }, time);
                })
        } else {
            $btnLeft
                .on('mouseenter', function () {
                    $(this).stop().animate({
                        left: 35 + 'px'
                    }, time);
                })
                .on('mouseout', function () {
                    $(this).stop().animate({
                        left: -20 + 'px'
                    }, time);
                })
                .on('click', function () {
                    $position += 1;
                    start('next');
                    slide();
                    //console.log($position);
                    $nasaText.addClass('visible').animate({
                        opacity: 0
                    }, 500);
                })
        }
    };

    /// ajax
    function loadImage(type) {
        $.ajax({
            url: nasaUrl + getRandomDate()
        }).done(function (response) {
            //console.log(response, type);
            var url = response.hdurl;
            var $image = $('<img>').attr('src', url);
            $image
                .on('load', function () {
                    // console.log('zdjęcie pobrane');
                    createImage(type, url);
                    $nasaText.addClass('visible').animate({
                        opacity: 1
                    }, 500);
                    stopLoader();
                })
                .on('error', function () {
                    console.log('error!');
                    error++;
                    if (error > 5) {
                        alert('Nie moge pobrać zdjęć');
                    }
                });
        }).fail(function () {
            alert('Brak połączenia z API NASA');
        });
    }

    function createImage(type, url) {
        var $li = $('<li>').css({
            'background-image': 'url(' + url + ')'
        });
        if (type === 'init') {
            $photoUl.append($li);
            $li.addClass('visible');
        } else if (type === 'next') {
            $photoUl.append($li);
            $li.addClass('visible');
        } else if (type === 'prev') {
            $photoUl.prepend($li);
            $photoUl.css('left', -(($position + 1) * sectionOneWidth) + 'px')
        }
    };

    function start(type) {

        if (typeof type === 'undefined') {
            type = 'init';
        }

        var $li = $photoUl.find('li');
        //console.log($li.length);
        if ($position >= $li.length) {
            if ($position < 0) {
                $position = 0;
            }
            loadImage(type);
        } else {
            createImage(type);
        }

    };

    // section 2

    function loadMarsImage(type) {
        $.ajax({
            url: marsUrl
        }).done(function (response) {
            // console.log(response, type);
            var url = response.photos;
            createGalleryImage(response.photos);
            var $image = $('<img>').attr('src', url.img_src);
            $image
                .on('error', function () {
                    console.log('error!');
                    error++;
                    if (error > 5) {
                        alert('Nie moge pobrać zdjęć');
                    }
                });
        }).fail(function () {
            alert('Brak połączenia z API NASA');
        });
    }

    /// galery btns 

    function createGalleryImage(response) {
        $.each(response, function (index, url) {
            if (mobile.matches) {
                var $li = $('<li>').css('display', 'flex').css('flex-direction', 'column').css('width', '100vw').css({
                    'background-image': 'url(' + url.img_src + ')'
                });
            } else if (desktop.matches) {
                var $li = $('<li>').css('display', 'flex').css('flex-direction', 'row').css('width', '33vw').css({
                    'background-image': 'url(' + url.img_src + ')'
                });

            }
            $galleryUl.append($li);
        })
    };

    $(window).resize(scrollTop);
    scrollTop();
    setSectionOneWidth();
    start();
    rightButton();
    leftButton();
    loadMarsImage();


});