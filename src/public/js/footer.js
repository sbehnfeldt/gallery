(async function (global, $) {
    'use strict';

    async function getCurrent() {
        const response = await fetch('/weather.php');
        return await response.json();
    }

    let now     = Date.now();
    let $footer = $('footer').first();

    let current = await getCurrent();
    $footer.html(`<img src="https://openweathermap.org/img/wn/${current['weather'][0]['icon']}@2x.png" /><span> Current Conditions: <span class="conditions">${current['weather'][0]['description']}</span> ${Math.round(current['main']['temp'])} &deg;</span>`);

})(this, jQuery);
