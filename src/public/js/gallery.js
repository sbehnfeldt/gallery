(function (global, $) {
    'use strict';
    console.log("Document ready");

    let $row = $('#gallery div.row').first();

    setInterval(() => {
        let $img = $('<img>').attr('src', '/image.php?' + Date.now());
        // $row.empty();
        $row.append($img);
        $img.on('load', () => {
            let $first = $row.find('img').eq(0);
            if ($first.offset().left < $row.offset().left ) {
                $first.remove()
            }
        });
    }, 3000)


})(this, jQuery);
