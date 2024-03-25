(function (global, $) {
    'use strict';
    console.log("Document ready");
    const INTERVAL = 5000

    let $rows = $('#gallery div.row');
    $rows.each((idx, row) => {
        let $row = $(row);
        setTimeout(() => {
            setInterval(() => {
                let $img = $('<img>').attr('src', '/image.php?' + Date.now());
                // $row.empty();
                $row.append($img);

                $img.on('load', () => {
                    $row.find('img').filter(function () {
                        return $(this).offset().left < $row.offset().left;
                    }).remove()
                });
            }, INTERVAL)
        }, idx * (INTERVAL / $rows.length))
    });


})(this, jQuery);
