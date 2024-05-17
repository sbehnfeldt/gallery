import jQuery from 'jquery'
import moment from 'moment'


(async function (global, $) {
    'use strict';

    let $footer  = $('footer').first();
    let $weather = $footer.find('div.weather');

    let $current     = $weather.find('span.current');
    let $currentImgs = $weather.find('span.images');
    let $currentText = $weather.find('span.text')


    async function doCurrentConditions() {
        let response   = await fetch('/weather?weather');
        let conditions = await response.json();

        $current.empty().html(`Current conditions in ${conditions.name}: `)
        $currentImgs.empty();
        $currentText.empty()

        let descriptions = [];
        if (conditions['wind']['speed'] > 20) {
            descriptions.push('windy');
        } else if (conditions['wind']['speed'] > 10) {
            descriptions.push('breezy');
        }
        for (let i = 0; i < conditions['weather'].length; i++) {
            let weather = conditions['weather'][i];
            let $img    = $(`<img src="https://openweathermap.org/img/wn/${weather['icon']}@2x.png" />`);
            $currentImgs.append($img);
            descriptions.push(weather['description']);
        }
        descriptions[0] = descriptions[0].charAt(0).toUpperCase() + descriptions[0].slice(1);

        $currentText.html(`${descriptions.join(', ')}, ${Math.round(conditions['main']['temp'])} &deg;`);

        setTimeout(doCurrentConditions, 5 * 60 * 1000);   // Repeat every 5 minutes
    }


    function doTime() {
        let now    = Date.now();
        let $clock = $footer.find('.clock');
        $clock.text(moment(now).format('MMM D YYYY h:mm:ss a'));
        setTimeout(doTime, 1000);   // Update every second
    }


    doCurrentConditions();
    // doForecast();
    // showCurrent();
    doTime();


})(this, jQuery);
