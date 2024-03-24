(function (global, $) {
    'use strict';
    console.log("Document ready");

    let $row = $('#gallery div.row').first();

    setInterval(() => {
        let $img = $('<img>').attr('src', '/image.php?' + Date.now());
        // $row.empty();
        $row.append($img);
    }, 3000)


})(this, jQuery);
