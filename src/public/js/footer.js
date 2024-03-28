(async function (global, $) {
    'use strict';

    let $footer = $('footer').first();

    async function doCurrentConditions() {
        let response = await fetch('/weather.php?weather');
        let current  = await response.json();

        let $current = $footer.find('span.current');
        let $imgs    = $current.find('span.images');
        $imgs.empty();
        let $text = $current.find('span.text')
        $text.empty();

        let descriptions = [];
        for (let i = 0; i < current['weather'].length; i++) {
            let weather = current['weather'][i];

            let $img = $(`<img src="https://openweathermap.org/img/wn/${weather['icon']}@2x.png" />`);
            $imgs.append($img);

            descriptions.push(weather['description']);
        }
        descriptions[0] = descriptions[0].charAt(0).toUpperCase() + descriptions[0].slice(1);
        $text.html(`${descriptions.join(', ')}. ${Math.round(current['main']['temp'])} &deg;`);

        setTimeout(doCurrentConditions, 5 * 60 * 1000);
    }

    async function doForecast() {
        let now        = Date.now();
        const response = await fetch('/weather.php?forecast');
        let forecast   = await response.json();
        console.log(forecast);

        let $forecast = $footer.find('span.forecast');
        let $imgs     = $forecast.find('span.images');
        $imgs.empty()
    }

    function doTime() {
        let now    = Date.now();
        let $clock = $footer.find('.clock');
        $clock.text(moment(now).format('MMM D YYYY h:mm:ss a'));
        setTimeout(doTime, 1000);
    }


    doCurrentConditions();
    // doForecast();
    doTime();


})(this, jQuery);
