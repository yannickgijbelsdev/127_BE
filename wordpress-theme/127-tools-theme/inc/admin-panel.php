<?php
/**
 * Admin Panel Integration
 */

if (!defined('ABSPATH')) exit;

function tools_admin_menu() {
    add_menu_page(
        '127 Tools Dashboard',
        '127 Tools',
        'manage_options',
        '127-tools-dashboard',
        'tools_admin_dashboard_page',
        'dashicons-admin-tools',
        3
    );
    
    add_submenu_page(
        '127-tools-dashboard',
        'Analytics',
        'Analytics',
        'manage_options',
        '127-tools-analytics',
        'tools_admin_analytics_page'
    );
    
    add_submenu_page(
        '127-tools-dashboard',
        'Feedback',
        'Feedback',
        'manage_options',
        '127-tools-feedback',
        'tools_admin_feedback_page'
    );
    
    add_submenu_page(
        '127-tools-dashboard',
        'Autosoft Devices',
        'Autosoft Devices',
        'manage_options',
        '127-tools-autosoft',
        'tools_admin_autosoft_page'
    );
}
add_action('admin_menu', 'tools_admin_menu');

function tools_admin_dashboard_page() {
    include TOOLS_THEME_DIR . '/admin-templates/dashboard.php';
}

function tools_admin_analytics_page() {
    include TOOLS_THEME_DIR . '/admin-templates/analytics.php';
}

function tools_admin_feedback_page() {
    include TOOLS_THEME_DIR . '/admin-templates/feedback.php';
}

function tools_admin_autosoft_page() {
    include TOOLS_THEME_DIR . '/admin-templates/autosoft.php';
}
