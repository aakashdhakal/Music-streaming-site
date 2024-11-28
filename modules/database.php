<?php

//connect to the database
$servername = "localhost";
$username = "root";
$password = "A@kash123";
$database = "web_project";
$mysqli = new mysqli($servername, $username, $password, $database);
if ($mysqli->connect_error) {
    die("Connection failed:  $mysqli->connect_error");
}
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
