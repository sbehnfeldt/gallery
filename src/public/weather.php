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

$config  = $config['weather'];
$now     = time();
$current = null;
$when    = $_SERVER['QUERY_STRING'];
if (file_exists("../data/$when.json")) {
    $t   = filemtime("../data/$when.json");
    $age = $now - $t;
    if ($age < $config['cache'][$when]) {
        // cache for 4 hours (for testing)
        $current = file_get_contents("../data/$when.json");
    }
}
if ( ! $current) {
    $queryString = http_build_query($config['api']);
    $apiUrl      = sprintf('https://api.openweathermap.org/data/2.5/%s?%s', $when, $queryString);
    $current     = file_get_contents($apiUrl);
    $f           = file_put_contents("../data/$when.json", $current);
}

header('Content-Type: application/json');
echo($current);

//$forecast = file_get_contents( sprintf( 'https://api.openweathermap.org/data/2.5/forecast?%s', $queryString));
