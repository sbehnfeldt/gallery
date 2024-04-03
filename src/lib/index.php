<?php
global $config; ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900" rel="stylesheet">
        <!--        <link rel="stylesheet" href="/main.css">-->
        <link rel="stylesheet" href="/style.css">
        <meta charset="UTF-8">
        <title>Camelot Gallery</title>
    </head>
    <body>
        <main>
            <section id="announcements">
                <p>We had fun today counting to 5.</p>
                <p>Remember your permission slips tomorrow!</p>
            </section>
            <section id="gallery">
                <?php
                for ($i = 0; $i < $config['gallery']['nRows']; $i++): ?>
                    <div class="row"></div>
                <?php
                endfor; ?>
            </section>
        </main>
        <section class="falling-leaves">
            <div class="set">
                <div><img src="/imgs/leaf1.png" alt=""></div>
                <div><img src="/imgs/leaf2.png" alt=""></div>
                <div><img src="/imgs/leaf3.png" alt=""></div>
                <div><img src="/imgs/leaf4.png" alt=""></div>
                <div><img src="/imgs/leaf5.png" alt=""></div>
                <div><img src="/imgs/leaf6.png" alt=""></div>
                <div><img src="/imgs/leaf7.png" alt=""></div>
                <div><img src="/imgs/leaf8.png" alt=""></div>
                <div><img src="/imgs/leaf9.png" alt=""></div>
            </div>
            <div class="set set2">
                <div><img src="/imgs/leaf9.png" alt=""></div>
                <div><img src="/imgs/leaf8.png" alt=""></div>
                <div><img src="/imgs/leaf6.png" alt=""></div>
                <div><img src="/imgs/leaf7.png" alt=""></div>
                <div><img src="/imgs/leaf5.png" alt=""></div>
                <div><img src="/imgs/leaf1.png" alt=""></div>
                <div><img src="/imgs/leaf2.png" alt=""></div>
                <div><img src="/imgs/leaf3.png" alt=""></div>
                <div><img src="/imgs/leaf4.png" alt=""></div>
            </div>
            <div class="set set3">
                <div><img src="/imgs/leaf7.png" alt=""></div>
                <div><img src="/imgs/leaf8.png" alt=""></div>
                <div><img src="/imgs/leaf1.png" alt=""></div>
                <div><img src="/imgs/leaf5.png" alt=""></div>
                <div><img src="/imgs/leaf9.png" alt=""></div>
                <div><img src="/imgs/leaf2.png" alt=""></div>
                <div><img src="/imgs/leaf4.png" alt=""></div>
                <div><img src="/imgs/leaf6.png" alt=""></div>
                <div><img src="/imgs/leaf3.png" alt=""></div>
            </div>
        </section>
        <footer>
            <div class="weather">
                <span class="current">Current Conditions:
                    <span class="images"></span>
                    <span class="text"></span>
                </span>
                <!--                <span class="forecast">Tomorrow's Forecast:-->
                <!--                    <span class="images"></span>-->
                <!--                    <span class="text"></span>-->
                <!--                </span>-->
            </div>
            <div class="clock"></div>
        </footer>

        <!--        <script type="application/javascript"-->
        <!--                src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min.js"></script>-->
        <!--        <script src="https://code.jquery.com/jquery-3.7.1.js"></script>-->
        <!--        <script src="/js/gallery.js"></script>-->
        <!--        <script src="/js/weather.js"></script>-->
        <script src="/bundle.js"></script>
    </body>
</html>