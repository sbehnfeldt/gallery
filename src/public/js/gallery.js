(function (global, $) {
    'use strict';
    console.log("Document ready");
    const INTERVAL = 6000


    // Add image to end of a row (on the right)
    function pushImage($row, $img) {
        $row.append($img);
        $img.on('load', () => {
            $row.find('img').filter(function () {
                return $(this).offset().left < $row.offset().left;
            }).remove()
        });
    }

    // Add image to start of a row (on the left)
    function unshiftImage($row, $img) {
        $row.prepend($img);
        $img.on('load', () => {
            $row.find('img').filter(function () {
                return ($(this).offset().left + $(this).width()) > ($row.offset().left + $row.width());
            }).remove();
        });
    }

    function placeImg(idx, $row) {
        let $img = $(`<img>`).attr('src', '/image.php?' + Date.now());
        if (idx % 2) {
            pushImage($row, $img);
        } else {
            unshiftImage($row, $img);
        }
    }


    let $rows = $('#gallery div.row');
    $rows.each((idx, row) => {
        let $row = $(row);
        setTimeout(() => {
            setInterval(placeImg.bind(null, idx, $row), INTERVAL)
        }, idx * (INTERVAL / $rows.length))
    });

})(this, jQuery);
