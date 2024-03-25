(function (global, $) {
    'use strict';
    console.log("Document ready");
    const INTERVAL = 3000

    let $rows = $('#gallery div.row');
    $rows.each((idx, row) => {
        let $row = $(row);
        setTimeout(() => {
            setInterval(() => {
                let $img = $('<img>').attr('src', '/image.php?' + Date.now());

                if (idx % 2) {
                    // Odd rows, push on from the right
                    $row.append($img);
                    $img.on('load', () => {
                        let $imgs = $row.find('img').filter(function () {
                            return $(this).offset().left < $row.offset().left;
                        })
                        $imgs.remove()
                    });

                } else {
                    // Even rows, push on from the left
                    $row.prepend($img);
                    $img.on('load', () => {
                        let $imgs = $row.find('img').filter(function () {
                            return ($(this).offset().left + $(this).width()) > ($row.offset().left + $row.width());
                        });

                        $imgs.remove()
                    });

                }
            }, INTERVAL)
        }, idx * (INTERVAL / $rows.length))
    });


})(this, jQuery);
