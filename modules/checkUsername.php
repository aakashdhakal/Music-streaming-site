<?php

include_once 'database.php';
include_once 'extraFunctions.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = mysqli_query($mysqli, $sql);
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(["message" => "Username already exists", "status" => 409]);
    } else {
        echo json_encode(["message" => "Username available", "status" => 200]);
    }
} else {
    echo json_encode(["message" => "Invalid Request", "status" => 400]);
}