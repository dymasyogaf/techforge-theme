<?php
/**
 * TechForge Theme Functions and Definitions
 *
 * @package TechForge
 * @version 1.0.5
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function techforge_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    
    // Register Menus
    register_nav_menus([
        'primary' => __('Primary Menu', 'techforge'),
        'footer'  => __('Footer Menu', 'techforge'),
    ]);
}
add_action('after_setup_theme', 'techforge_setup');

/**
 * Enqueue scripts and styles with optimized loading.
 */
function techforge_assets() {
    // Google Fonts (Inter)
    wp_enqueue_style(
        'techforge-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
        [],
        null
    );

    // Theme Stylesheet (style.css)
    wp_enqueue_style(
        'techforge-style',
        get_stylesheet_uri(),
        ['techforge-google-fonts'],
        '1.0.5'
    );

    // Main Tailwind Compiled CSS
    wp_enqueue_style(
        'techforge-main',
        get_template_directory_uri() . '/assets/css/main.css',
        ['techforge-style'],
        '1.0.5'
    );

    // Main Interactive JS
    wp_enqueue_script(
        'techforge-main',
        get_template_directory_uri() . '/assets/js/main.js',
        [],
        '1.0.5',
        true
    );
}
add_action('wp_enqueue_scripts', 'techforge_assets');

/**
 * Performance & Security Optimizations:
 * Remove bloat, emoji scripts, redundant generator tags, and feeds.
 */
function techforge_cleanup_head() {
    // Remove WordPress version
    remove_action('wp_head', 'wp_generator');
    
    // Remove RSD link
    remove_action('wp_head', 'rsd_link');
    
    // Remove Windows Live Writer link
    remove_action('wp_head', 'wlwmanifest_link');
    
    // Remove shortlink
    remove_action('wp_head', 'wp_shortlink_wp_head');
    
    // Remove adjacent posts links
    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);
    
    // Disable emojis
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
}
add_action('init', 'techforge_cleanup_head');

/**
 * Add Preconnect Resource Hints for Performance
 */
function techforge_resource_hints($hints, $relation_type) {
    if ('preconnect' === $relation_type) {
        $hints[] = [
            'href' => 'https://fonts.googleapis.com',
            'crossorigin' => 'anonymous',
        ];
        $hints[] = [
            'href' => 'https://fonts.gstatic.com',
            'crossorigin' => 'anonymous',
        ];
    }
    return $hints;
}
add_filter('wp_resource_hints', 'techforge_resource_hints', 10, 2);
