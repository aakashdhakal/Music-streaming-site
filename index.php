<?php
// Commented out header redirection to the home section
// header("Location: $baseUrl/pages/homeSection/homeSection.php");

// Include the router file
require_once __DIR__ . '/router.php';

// Define the base URL of the application
$baseUrl = "/WEB-PROJECT";

// Define routes
get($baseUrl, "pages/tempHome/home.php"); // Route for the root URL
get($baseUrl . '/home', "pages/tempHome/home.php"); // Route for the /home URL

// Example of a POST route (commented out)
// post('/user', '/api/save_user');

// Define a catch-all route for 404 errors
any('/404', 'pages/404.php');