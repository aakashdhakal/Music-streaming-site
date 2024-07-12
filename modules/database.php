<?php

//connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$database = "web_project";

$mysqli = new mysqli($servername, $username, $password, $database);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
