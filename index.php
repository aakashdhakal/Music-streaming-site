<?php
// Commented out header redirection to the home section
// header("Location: /pages/homeSection/homeSection.php");

// Include the router file
require_once __DIR__ . '/router.php';

// Define the base URL of the application

// Define routes
get("/", "pages/home/mainHome.php"); // Route for the root URL
get('/home', "pages/home/mainHome.php"); // Route for the /home URL

// Example of a POST route (commented out)
// post('/user', '/api/save_user');
post('/getPlaylistQueue', 'modules/getPlaylistQueue.php');

// Define a catch-all route for 404 errors
any('/404', 'pages/404.php');