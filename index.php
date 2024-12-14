<?php
// Include the router file
require_once 'router.php';

// Define GET routes
get('/', 'pages/home/mainHome.php'); // Route for the root URL
get('/home', 'pages/home/mainHome.php'); // Route for the /home URL
get('/discover', 'pages/home/mainHome.php'); // Route for the /discover URL
get('/trending', 'pages/home/mainHome.php'); // Route for the /trending URL
get('/favourites', 'pages/home/mainHome.php'); // Route for the /favourites URL
get('/search', 'pages/home/mainHome.php'); // Route for the /search URL
get('/search/$tag', 'pages/home/mainHome.php'); // Route for the /search URL
get('/upload', 'pages/home/mainHome.php'); // Route for the /upload URL



// Route for logging out
get('/logout', 'modules/logoutUser.php');

// Define POST routes for dynamically loading pages
post('/', 'pages/home/home.php'); // Route for the root URL
post('/favourites', 'pages/favourites/favourites.php'); // Route for the /favourites URL
post('/discover', 'pages/discover/discover.php'); // Route for the /discover URL
post('/trending', 'pages/trending/trending.php'); // Route for the /trending URL
post('/search/$tag', 'pages/search/search.php'); // Route for the /search URL
post('/upload', 'pages/home/addMusic.php'); // Route for the /upload URL

// Define POST routes for various modules
post('/checkUsername', 'modules/checkUsername.php'); // Route for checking username availability
post('/getPlaylistQueue', 'modules/getPlaylistQueue.php'); // Route for getting playlist queue
post('/fetchmusic', 'modules/fetchMusic.php'); // Route for fetching music
post('/addToFavourite', 'modules/addToFavourite.php'); // Route for adding to favourites
post('/addToPlaylist', 'modules/addToPlaylist.php'); // Route for adding to playlist
post('/createPlaylist', 'modules/createPlaylist.php'); // Route for creating a playlist
post('/getPlaylist', 'modules/getPlaylist.php'); // Route for getting a playlist
post('/addToHistory', 'modules/addToHistory.php'); // Route for adding to history
post('/checkLoginStatus', 'modules/checkLoginStatus.php'); // Route for checking login status
post('/setNotificationReadStatus', 'modules/setNotificationReadStatus.php'); // Route for setting notification read status
post('/deleteNotification', 'modules/deleteNotification.php'); // Route for deleting a notification
post('/otpConfig', 'modules/otpConfig.php'); // Route for OTP configuration
post('/checkEmail', 'modules/checkEmail.php'); // Route for checking email
post('/loginUser', 'modules/loginUser.php'); // Route for logging in a user
post('/registerUser', 'modules/registerUser.php'); // Route for registering a user
post('/resetPassword', 'modules/resetPassword.php'); // Route for resetting password
post('/getTrendingQueue', 'modules/getTrendingQueue.php'); // Route for getting trending queue
post('/getFavouritesQueue', 'modules/getFavouritesQueue.php'); // Route for getting favourites queue
post('/getMusicQueue', 'modules/getMusicQueue.php'); // Route for getting music queue
post('/fetchNotifications', 'modules/fetchNotifications.php'); // Route for fetching notifications

// Define a catch-all route for 404 errors
any('/404', 'pages/404/404.php'); // Route for 404 error page
