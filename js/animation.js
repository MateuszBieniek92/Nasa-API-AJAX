$(function () {

    ///media queries

    var mobile = window.matchMedia("screen and (max-width: 550px)");
    var desktop = window.matchMedia("screen and (min-width: 900px)");
    var tablet = window.matchMedia("screen and (min-width: 551px) and (max-width: 899px)");

    /// nasa parameters

    var nasaUrl = 'https://api.nasa.gov/planetary/apod?api_key=YJxJW0IUSKxKADo5NqCyWhDkKWnchFkXGm06sTfW&date=';

    var $photoUl = $('.photo');
    var $btnLeft = $('.btnLeft');
    var $btnRight = $('.btnRight');
    var $sectionOne = $('.sectionOne');

    var sectionOneWidth;
    setSectionOneWidth();
    var $array = $photoUl.find('li');
    var $position = $array.index($('.visible'));
    var $arrayLength = $array.length;
    console.log($arrayLength);
    console.log('tablica: ' + $array);
    $position = 0;

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
        $array.eq($position).css('opacity', 0);
        $('.visible').animate({
            opacity: 0
        }, 2000, function () {
            $(this).removeClass('visible');
            $array.eq($position).addClass('visible').animate({
                opacity: 1
            }, 500);
        })
    }

    function rightButton() {
        $btnRight
            .on('click', function () {
                $position += 1;
                start('next');
                slide();
                console.log($position);
            })

    };

    function leftButton() { /// do zrobienia 
        $btnLeft
            .on('click', function () {
                $position += 1;
                start('next');
                slide();
                console.log($position);
            })

    };

    /// ajax
    function loadImage(type) {
        $.ajax({
            url: nasaUrl + getRandomDate()
        }).done(function (response) {
            console.log(response, type);
            var url = response.hdurl;
            var $image = $('<img>').attr('src', url);
            $image
                .on('load', function () {
                    console.log('zdjęcie pobrane');
                    createImage(type, url);
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
        //        if (typeof type === 'undefined') {
        //            type = 'init';
        //        }

        if (type === 'init') {
            $photoUl.append($li)
            $li.addClass('visible');
        } else if (type === 'next') {
            $photoUl.append($li);
            $li.addClass('visible');
        } else if (type === 'prev') {
            $photoUl.prepend($li);
            $photoUl.css('left', -(($position + 1) * sectionOneWidth) + 'px')
                //$li.addClass('visible').css('opacity', '1');

        }
    };

    function start(type) {

        if (typeof type === 'undefined') {
            type = 'init';
        }

        var $li = $photoUl.find('li');
        console.log($li.length);
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

    var $galleryUl = $('.gallery');

    function createGalleryImage(type, url) {
        if (mobile.matches) {
            var $li = $('<li>').css('display', 'flex').css('flex-direction', 'column').css('border', '2px solid green').css('width', '100vw');
        } else if (desktop.matches) {
            var $li = $('<li>').css('display', 'flex').css('flex-direction', 'row').css('border', '2px solid green').css('width', '33.333vw');
            //.css({'background-image': 'url(' + url + ')'
            //});
        }
        $galleryUl.append($li);
    };



    createGalleryImage();
    start();
    rightButton();
    leftButton();



});