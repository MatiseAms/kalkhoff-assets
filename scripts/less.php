<?php

require __DIR__ . '/../vendor/autoload.php';

$parser = new Less_Parser();
$parser->parseFile( __DIR__ . '/../dist/assets.less', 'http://example.com/' );
$css = $parser->getCss();
