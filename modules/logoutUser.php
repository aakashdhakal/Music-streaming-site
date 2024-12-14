<?php
// Start the session
session_start();

// Check if the session is active and destroy it
if (session_status() == PHP_SESSION_ACTIVE) {
    session_destroy();
}
echo "sadsdasd";
// Redirect to the home page
header("Location: /home");
exit();