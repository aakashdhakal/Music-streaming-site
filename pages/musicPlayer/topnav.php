<div class="top-nav">
    <div class="breadcrumb nav-links">
        <a href="#">Home</a>
    </div>
    <div class="search-bar">
        <input type="text" placeholder="Search for songs, albums, artists...">
        <button type="submit"><i class="fa fa-search"></i></button>
    </div>

    <div class="right">
        <button class="upload-music-page-show-btn"><i class="fa-solid fa-cloud-arrow-up"></i></button>
        <div class="profile-section">
            <img src="<?php echo $_SESSION["user_image"] ?>" alt="Profile Picture" class="profile-pic">
            <div class="profile-menu">
                <a href="/WEB-PROJECT/pages/profile/profile.php">
                    <i class="fa-solid fa-user"></i> Profile</a>
                <a href="/WEB-PROJECT/modules/logoutUser.php">
                    <i class="fa-solid fa-sign-out"></i> Logout</a>
            </div>
        </div>
    </div>
</div>
<div class="alert-container">

</div>