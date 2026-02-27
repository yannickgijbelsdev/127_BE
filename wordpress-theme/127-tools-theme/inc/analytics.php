<?php
/**
 * Analytics Functions
 */

if (!defined('ABSPATH')) exit;

function tools_track_page_visit($tool_id, $tool_name) {
    tools_insert_analytics($tool_id, $tool_name, 'page_visit', array(
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'ip' => $_SERVER['REMOTE_ADDR'] ?? ''
    ));
}
