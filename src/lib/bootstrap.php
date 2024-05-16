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

    if ( ! file_exists('gallery')) {
        if ( ! mkdir('gallery')) {
            die('Cannot make gallery directory');
        }
    }

    if ( ! file_exists('../config.json')) {
        die('Cannot find configuration file');
    }
    if (false === ($contents = file_get_contents('../config.json'))) {
        die('Cannot read configuration file');
    }

    if (null === ($config = json_decode($contents, true))) {
        die('Cannot parse contents of configuration file');
    }

    return $config;
}

/**
 * @return string
 * @throws Exception
 */
function image(): string
{
    if ( ! array_key_exists('gallery_index', $_SESSION)) {
        $_SESSION['gallery_index'] = 0;
    }

    if ( ! file_exists('./gallery')) {
        if ( ! mkdir('./gallery')) {
            throw new Exception('Cannot create gallery directory');
        }
    }

    $files = scandir('./gallery');
    $files = array_filter($files, function ($filename) {
        $ext = pathinfo($filename, PATHINFO_EXTENSION);

        return in_array(strtolower($ext), ['jpg', 'png']);
    });
    $files = array_values($files);

    $img = file_get_contents('./gallery/' . $files[$_SESSION['gallery_index']]);

    $_SESSION['gallery_index']++;
    if ($_SESSION['gallery_index'] >= count($files)) {
        $_SESSION['gallery_index'] = 0;
    }

    return $img;
}

function weather(): string
{
    global $config;

    $now     = time();
    $current = null;
    if (file_exists("../data/weather.json")) {
        $t   = filemtime("../data/weather.json");
        $age = $now - $t;
        if ($age < $config['weather']['cache']['current']) {
            // cache for 4 hours (for testing)
            $current = file_get_contents("../data/weather.json");
        }
    }
    if ( ! $current) {
        $queryString = http_build_query($config['weather']['api']);
        $apiUrl      = sprintf('https://api.openweathermap.org/data/2.5/weather?%s', $queryString);
        $current     = file_get_contents($apiUrl);
        $f           = file_put_contents("../data/weather.json", $current);
    }

    return $current;
}