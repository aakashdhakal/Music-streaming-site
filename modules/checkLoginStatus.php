<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION["user_id"])) {
    echo json_encode(['status' => 200, 'message' => 'User is logged in']);
} else {
    echo json_encode(['status' => 401, 'message' => 'User is not logged in']);
}