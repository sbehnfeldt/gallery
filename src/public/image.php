<?php
require '../vendor/autoload.php';
if ( ! file_exists('../sessions')) {
    if ( ! mkdir('../sessions')) {
        die('Cannot make sessions directory');
    }
}
session_save_path('../sessions');
if ( ! session_start()) {
    die('Cannot start session');
}

if ( !array_key_exists('gallery_index', $_SESSION )) {
    $_SESSION[ 'gallery_index'] = 0;
}


$files = scandir('./gallery');
$files = array_filter($files, function($filename) {
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    return in_array(strtolower($ext), ['jpg', 'png']);
});
$files = array_values($files);

// Headers to tell browser NOT to cache this image, but this doesn't seem to work.
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0"); // Proxies.
header('Content-Type: image/jpeg');
readfile( './gallery/' . $files[$_SESSION[ 'gallery_index']] );

$_SESSION[ 'gallery_index']++;
if ( $_SESSION[ 'gallery_index'] > count($files)) {
    $_SESSION[ 'gallery_index'] = 0;
}


