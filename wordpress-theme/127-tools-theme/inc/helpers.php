<?php
/**
 * Helper Functions
 */

if (!defined('ABSPATH')) exit;

function tools_get_enabled_tools() {
    $args = array(
        'post_type' => 'diagnostic_tool',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => '_tool_enabled',
                'value' => '1',
                'compare' => '='
            )
        )
    );
    return new WP_Query($args);
}

function tools_generate_uuid() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

function tools_is_admin_user() {
    return current_user_can('manage_options');
}
