<?php
function codingcollective_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    
    // Register Menus
    register_nav_menus([
        'primary' => 'Primary Menu',
        'footer'  => 'Footer Menu',
    ]);
}
add_action('after_setup_theme', 'codingcollective_setup');

function codingcollective_assets() {
    // Enqueue CSS
    wp_enqueue_style(
        'codingcollective-main',
        get_template_directory_uri() . '/assets/css/main.css',
        [],
        '1.0.0'
    );

    // Enqueue JS
    wp_enqueue_script(
        'codingcollective-main',
        get_template_directory_uri() . '/assets/js/main.js',
        [],
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'codingcollective_assets');
