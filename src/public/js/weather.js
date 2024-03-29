(async function (global, $) {
    'use strict';

    let $footer = $('footer').first();

    let $current     = $footer.find('span.current');
    let $currentImgs = $current.find('span.images');
    let $currentText = $current.find('span.text')

    let $forecast     = $footer.find('span.forecast');
    let $forecastImgs = $forecast.find('span.images');
    let $forecastText = $forecast.find('span.text');


    async function doCurrentConditions() {
        let response = await fetch('/weather.php?weather');
        let current  = await response.json();

        $currentImgs.empty();
        $currentText.empty();

        let descriptions = [];
        for (let i = 0; i < current['weather'].length; i++) {
            let weather = current['weather'][i];
            let $img    = $(`<img src="https://openweathermap.org/img/wn/${weather['icon']}@2x.png" />`);
            $currentImgs.append($img);
            descriptions.push(weather['description']);
        }
        descriptions[0] = descriptions[0].charAt(0).toUpperCase() + descriptions[0].slice(1);
        $currentText.html(`${descriptions.join(', ')}. ${Math.round(current['main']['temp'])} &deg;`);

        setTimeout(doCurrentConditions, 5 * 60 * 1000);   // Repeat every 5 minutes
    }

    async function doForecast() {
        const response = await fetch('/weather.php?forecast');
        let forecast   = await response.json();
        // console.log(forecast);

        let date = new Date();
        console.log(date);
        console.log(date.getHours());

        // let now        = Date.now();
        // console.log(now);

        $forecastImgs.empty()


        setTimeout(doForecast, 3 * 60 * 60 * 1000);   // Repeat every 3 hours
    }


    function doTime() {
        let now    = Date.now();
        let $clock = $footer.find('.clock');
        $clock.text(moment(now).format('MMM D YYYY h:mm:ss a'));
        setTimeout(doTime, 1000);   // Update every second
    }


    doCurrentConditions();
    doForecast();
    doTime();


})(this, jQuery);
