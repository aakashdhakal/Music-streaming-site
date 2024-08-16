<?php
// Start the session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$website_title = "Name - Some cool slogan here";

if (isset($_SESSION['user_id'])) {
    header("Location: /WEB-PROJECT/pages/musicPlayer/playerHome.php");
    exit();
}

// Adjust the paths to the included files
include_once __DIR__ . "/../head.php";
?>
<link rel="stylesheet" href="/WEB-PROJECT/public/CSS/home.css">
</head>

<body>
    <?php
    include_once __DIR__ . "/../navbar.php";
    include_once __DIR__ . "/login.php";
    ?>
    <script src="/WEB-PROJECT/public/JS/script.js"></script>
    <script src="/WEB-PROJECT/public/JS/login.js"></script>
</body>