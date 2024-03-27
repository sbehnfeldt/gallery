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


$config      = json_decode(file_get_contents('../config.json'), true);
$config      = $config['weather'];
$queryString = http_build_query($config);
$apiUrl      = sprintf('https://api.openweathermap.org/data/2.5/weather?%s', $queryString);

$current = json_decode(file_get_contents('current-weather.json'), true);
//$current = file_get_contents( 'https://google.com');
//$current = file_get_contents( $apiUrl);
header('Content-Type: application/json');
echo(json_encode($current));



//$forecast = file_get_contents( sprintf( 'https://api.openweathermap.org/data/2.5/forecast?%s', $queryString));

