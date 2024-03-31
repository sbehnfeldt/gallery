<?php
require_once '../lib/bootstrap.php';

$config = bootstrap();
echo file_get_contents('../templates/index.html.twig');