<?php

require __DIR__ . '/../vendor/autoload.php';


$output_folder = '/../test/generated-from-less/';
// create test distFolder

// if (!file_exists($output_folder)) {
//   mkdir($output_folder, 0775, true);
// }



// Base Assets
$parser = new Less_Parser();
$parser->parseFile( __DIR__ . '/../dist/assets.less', 'http://example.com/' );
$css = $parser->getCss();

file_put_contents(__DIR__ . $output_folder.'php-assets.css', $css);

// Classes Assets
$parser_classes = new Less_Parser();
$parser_classes->parseFile( __DIR__ . '/../dist/assets-classes.less', 'http://example.com/' );
$css_classes = $parser_classes->getCss();

file_put_contents(__DIR__ . $output_folder.'php-assets-classes.css', $css_classes);
