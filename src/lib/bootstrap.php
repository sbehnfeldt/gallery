<?php
require '../vendor/autoload.php';

function bootstrap()
{
    if ( ! file_exists('../sessions')) {
        if ( ! mkdir('../sessions')) {
            die('Cannot make sessions directory');
        }
    }
    session_save_path('../sessions');
    if ( ! session_start()) {
        die('Cannot start session');
    }

    return json_decode(file_get_contents('../config.json'), true);
}
