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


    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomDate() {
        var year = randomInt(2005, 2016);
        var month = randomInt(1, 12);
        var day = randomInt(1, 28);

        return year + '-' + month + '-' + day;
    }

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
                    createImage( url);
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

    function createImage(url) {
        var $li = $('<li>').
        css({
            'background-image': 'url(' + url + ')'
        });
        $photoUl.append($li);
    }

        loadImage();

});