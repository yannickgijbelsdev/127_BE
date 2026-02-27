<?php
/**
 * Database Functions
 * Handles database operations for analytics, feedback, tools
 */

if (!defined('ABSPATH')) exit;

/**
 * Get or Create Analytics Table
 */
function tools_init_analytics_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'tools_analytics';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        tool_id varchar(50) NOT NULL,
        tool_name varchar(255) NOT NULL,
        event_type varchar(50) NOT NULL,
        event_data text,
        timestamp datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        KEY tool_id (tool_id),
        KEY event_type (event_type),
        KEY timestamp (timestamp)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

/**
 * Get or Create Feedback Table
 */
function tools_init_feedback_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'tools_feedback';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        tool_name varchar(255) NOT NULL,
        rating int(1) NOT NULL,
        comment text,
        timestamp datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        KEY tool_name (tool_name),
        KEY rating (rating)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

/**
 * Get or Create Autosoft Devices Table
 */
function tools_init_autosoft_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'autosoft_devices';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        barcode varchar(255) NOT NULL UNIQUE,
        device_type varchar(255),
        platform varchar(50),
        serial_number varchar(255),
        history longtext,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        UNIQUE KEY barcode (barcode)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

// Initialize tables on theme activation
add_action('after_switch_theme', 'tools_init_all_tables');
function tools_init_all_tables() {
    tools_init_analytics_table();
    tools_init_feedback_table();
    tools_init_autosoft_table();
}

/**
 * Insert Analytics Event
 */
function tools_insert_analytics($tool_id, $tool_name, $event_type, $event_data = array()) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'tools_analytics';
    
    return $wpdb->insert(
        $table_name,
        array(
            'tool_id' => sanitize_text_field($tool_id),
            'tool_name' => sanitize_text_field($tool_name),
            'event_type' => sanitize_text_field($event_type),
            'event_data' => wp_json_encode($event_data),
            'timestamp' => current_time('mysql')
        ),
        array('%s', '%s', '%s', '%s', '%s')
    );\
}
