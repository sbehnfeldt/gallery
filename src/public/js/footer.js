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

    doCurrentConditions();


    let now = Date.now();
    // console.log(now);
    // console.log(moment(now));
    // console.log( moment(now).format('YYYY-MM-D'));
})(this, jQuery);
