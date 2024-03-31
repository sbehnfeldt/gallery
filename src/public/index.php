<?php
require_once '../lib/bootstrap.php';

$config = bootstrap();
$uri    = $_SERVER['REQUEST_URI'];
$path   = parse_url($uri);
switch ($path['path']) {
    case '/':
        include '../lib/index.php';
        break;

    case '/image':
        // Headers to tell browser NOT to cache this image (but this doesn't seem to work).
        header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
        header("Pragma: no-cache"); // HTTP 1.0.
        header("Expires: 0"); // Proxies.
        header('Content-Type: image/jpeg');
        echo image();
        break;

    case '/weather':
        header('Content-Type: application/json');
        echo weather();
        break;

    default:
        break;
}