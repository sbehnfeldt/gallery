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

        $currentText.html(`${descriptions.join(', ')}, ${Math.round(current['main']['temp'])} &deg;`);

        setTimeout(doCurrentConditions, 5 * 60 * 1000);   // Repeat every 5 minutes
    }


    async function doForecast() {
        const response = await fetch('/weather.php?forecast');
        let forecast   = await response.json();
        console.log(forecast);

        let today = new Date();

        // if (today.getHours() < 13) {
        //     let temp = doTodaysForecast(forecast['list'].filter((item) => {
        //         let d = new Date(item['dt_txt']);
        //         return d.getDate() === today.getDate();
        //     }));
        //     let sunset = moment.unix(forecast[ 'city' ][ 'sunset' ]).format( 'LT')
        //     $forecast.text(`Today's weather: ${temp}. Sunset at ${sunset}`)
        //
        //
        // } else {
        //     $forecast.text("Tomorrow's forecast: ")
        // }

        // $forecastImgs.empty()

        // setTimeout(doForecast, 3 * 60 * 60 * 1000);   // Repeat every 3 hours
    }

    function doTodaysForecast(items) {
        console.log(items);
        let forecast = [];

        forecast.push(items[0].weather[0].main);
        return forecast.join(', ');
    }

    function doTomorrowsForecast() {
    }


    function doTime() {
        let now    = Date.now();
        let $clock = $footer.find('.clock');
        $clock.text(moment(now).format('MMM D YYYY h:mm:ss a'));
        setTimeout(doTime, 1000);   // Update every second
    }


    function showCurrent() {
        $forecast.fadeOut(500, () => {
            $current.fadeIn(500);
            setTimeout(showForecast, 5000);
        });
    }

    function showForecast() {
        $current.fadeOut(500, () => {
            $forecast.fadeIn(500);
            setTimeout(showCurrent, 5000);
        });
    }

    doCurrentConditions();
    // doForecast();
    // showCurrent();
    doTime();


})(this, jQuery);
