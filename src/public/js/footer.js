(async function (global, $) {
    'use strict';
    console.log("Footer ready");
    let now = Date.now();

    // console.log(now);


    let $footer = $('footer').first();

    async function getCurrent() {
        const response = await fetch('/weather.php');
        return await response.json();
    }

    let current = await getCurrent();
    console.log(current);

    $footer.html(`<img src="https://openweathermap.org/img/wn/${current['weather'][0]['icon']}@2x.png" /><span> Current Conditions: <span class="conditions">${current['weather'][0]['description']}</span> ${Math.round(current['main']['temp'])} &deg;</span>`);

})(this, jQuery);
