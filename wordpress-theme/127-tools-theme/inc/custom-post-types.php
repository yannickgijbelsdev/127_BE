<?php
/**
 * Custom Post Types
 */

if (!defined('ABSPATH')) exit;

function tools_register_cpt() {
    register_post_type('diagnostic_tool', array(
        'labels' => array(
            'name' => 'Diagnostic Tools',
            'singular_name' => 'Tool'
        ),
        'public' => true,
        'has_archive' => false,
        'menu_icon' => 'dashicons-admin-tools',
        'supports' => array('title', 'editor', 'thumbnail'),
        'show_in_rest' => true
    ));
}
add_action('init', 'tools_register_cpt');
