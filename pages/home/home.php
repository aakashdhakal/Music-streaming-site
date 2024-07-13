<?php
$website_title = "Name - Some cool slogan here";

include_once "pages/head.php";
// Move the link tag here if views/head.php contains the opening of the <head> section
?>
<link rel="stylesheet" href="public/CSS/home.css">
</head>

<body>
    <?php
    include_once "pages/navbar.php";
    include_once "pages/home/login.php";
    ?>
    <script src="/WEB-PROJECT/public/JS/script.js"></script>
    <script src="/WEB-PROJECT/public/JS/login.js"></script>
</body>