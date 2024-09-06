<div class="top-nav">
    <div class="breadcrumb nav-links">
        <a href="#">Home</a>
    </div>
    <div class="search-bar">
        <input type="text" placeholder="Search for songs, albums, artists...">
        <button type="submit"><i class="fa fa-search"></i></button>
    </div>

    <?php
    if (isset($_SESSION['user_id'])) {

        ?>

        <div class="right">
            <button class="upload-music-page-show-btn"><i class="fa-solid fa-cloud-arrow-up"></i></button>
            <div class="profile-section">
                <img src="<?php echo $_SESSION["user_image"] ?>" alt="Profile Picture" class="profile-pic">
                <div class="profile-menu">
                    <a href="<?php echo $baseUrl ?>/pages/profile/profile.php">
                        <i class="fa-solid fa-user"></i> Profile</a>
                    <a href="<?php echo $baseUrl ?>/modules/logoutUser.php">
                        <i class="fa-solid fa-sign-out"></i> Logout</a>
                </div>
            </div>
        </div>
        <?php
    } else {
        ?>
        <div class="login-signup">
            <button class="secondary-btn login-form-show-btn">Login</button>
            <button class="primary-btn signup-form-show-btn">Signup</button>
        </div>
        <?php
    }
    ?>

</div>
<div id="loadingProgress"></div>
<div class="alert-container">

</div>