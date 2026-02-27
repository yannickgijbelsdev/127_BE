<?php
/**
 * Autosoft Integration
 */

if (!defined('ABSPATH')) exit;

function tools_autosoft_scan_device($barcode) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'autosoft_devices';
    
    $device = $wpdb->get_row($wpdb->prepare(
        "SELECT * FROM $table_name WHERE barcode = %s",
        $barcode
    ));
    
    if ($device) {
        $device->history = json_decode($device->history, true);
        return $device;
    }
    
    return null;
}

function tools_autosoft_create_device($barcode, $device_data) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'autosoft_devices';
    
    $wpdb->insert(
        $table_name,
        array(
            'barcode' => $barcode,
            'device_type' => $device_data['device_type'] ?? '',
            'platform' => $device_data['platform'] ?? '',
            'serial_number' => $device_data['serial_number'] ?? '',
            'history' => wp_json_encode(array())
        ),
        array('%s', '%s', '%s', '%s', '%s')
    );
    
    return $wpdb->insert_id;
}

function tools_autosoft_add_check($barcode, $check_data) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'autosoft_devices';
    
    $device = tools_autosoft_scan_device($barcode);
    
    if ($device) {
        $history = is_array($device->history) ? $device->history : array();
        $history[] = array_merge($check_data, array(
            'timestamp' => current_time('mysql')
        ));
        
        $wpdb->update(
            $table_name,
            array('history' => wp_json_encode($history)),
            array('barcode' => $barcode),
            array('%s'),
            array('%s')
        );
        
        return true;
    }
    
    return false;
}
