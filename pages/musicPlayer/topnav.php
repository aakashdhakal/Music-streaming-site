<div class="top-nav">
    <div class="search-bar">
        <input type="text" placeholder="Search for songs, albums, artists, etc.">
        <button type="submit"><i class="fa fa-search"></i></button>
    </div>
    <button>Upload Your Music</button>

    <div class="profile-section">
        <img src="<?php echo $_SESSION["user_image"] ?>" alt="Profile Picture" class="profile-pic">
        <div class="profile-menu">
            <a href="#">Profile</a>
            <a href="#">Logout</a>
        </div>
    </div>
</div>