<?php
require '../vendor/autoload.php';

$config = json_decode(file_get_contents('../config.json'), true);
if ( ! file_exists('../sessions')) {
    if ( ! mkdir('../sessions')) {
        die('Cannot make sessions directory');
    }
}
session_save_path('../sessions');
if ( ! session_start()) {
    die('Cannot start session');
}

$now     = time();
$current = null;
if (file_exists('../data/current-weather.json')) {
    $t   = filemtime('../data/current-weather.json');
    $age = $now - $t;
    if ($age < (4 * 60 * 60)) {
        // cache for 4 hours (for testing)
        $current = file_get_contents('../data/current-weather.json');
    }
}
if ( ! $current) {
    $config      = $config['weather'];
    $queryString = http_build_query($config);
    $apiUrl      = sprintf('https://api.openweathermap.org/data/2.5/weather?%s', $queryString);
    $current     = file_get_contents($apiUrl);
    $f           = file_put_contents('../data/current-weather.json', $current);
}

header('Content-Type: application/json');
echo($current);

//$forecast = file_get_contents( sprintf( 'https://api.openweathermap.org/data/2.5/forecast?%s', $queryString));
