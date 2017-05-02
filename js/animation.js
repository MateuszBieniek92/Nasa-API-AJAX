$(function () {

    /// btn menu mobile    

    var mobile = window.matchMedia("screen and (max-width: 550px)");
    var desktop = window.matchMedia("screen and (min-width: 900px)");
    var tablet = window.matchMedia("screen and (min-width: 551px) and (max-width: 899px)");
    var $btn1 = $('.showHideMenu');
    var $list = $('.menu');
    
    var $photoUl = $('.photo');
    var $btnLeft = $('.btnLeft');
    var $btnRight = $('.btnRight');


    function getRandomDate() {
        var year = getRandomInt(2010, 2016);
        var month = getRandomInt(1, 12);
        var day = getRandomInt(1, 28);

        return year + '-' + month + '-' + day;
    }

    /// ajax
    function loadImage(type) {
        $.ajax({
            url: 'https://api.nasa.gov/planetary/apod?api_key=YJxJW0IUSKxKADo5NqCyWhDkKWnchFkXGm06sTfW' + getRandomDate()
        }).done(function (response) {
            console.log(response, type);
            var url = response.hdurl;
            if (typeof url !== 'undefined' && response.media_type === 'image') {
                var $image = $('<img>').attr('src', url);
                $image
                    .on('load', function () {
                        console.log('image load');

                        $loader.hide();
                        createImageElement(type, url);
                    })
                    .on('error', function () {
                        console.log('error!');
                        error++;
                        if (error > 5) {
                            alert('Nie mogę pobrać zdjęć');
                        } else {
                            setTimeout(function () {
                                loadImage(type);
                            }, 1000)
                        }
                    });

            } else {
                loadImage(type);
            }
            //console.log(response);
        }).fail(function () {
            alert('Brak połączenia z API NASA');
        });
    }

});