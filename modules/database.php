<?php

//connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$database = "web_project";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
