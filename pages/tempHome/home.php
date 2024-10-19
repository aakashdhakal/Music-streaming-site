<!DOCTYPE html>
<html lang="en">

<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
$website_title = "Sangeet- The Heartbeat of Music";
include_once "pages/head.php";

?>
<link rel="stylesheet" href="public/CSS/home.css">
</head>

<body>
    <!-- <?php
    include_once "pages/preloader.php";
    ?> -->


    <nav id="sideNav">
        <div class="logo-container">
            <a href="<?php echo $baseUrl ?>">
                <!-- <img src="public/images/logo-title-side.svg" alt="logo"> -->
            </a>
        </div>
        <ul>
            <li class="active"><a href="pages/tempHome/home.php"><i class="fa-solid fa-home"></i>Home</a></li>
            <li><a href="pages/tempHome/about.php"><i class="fa-solid fa-compass"></i>Discover</a></li>
            <li><a href="pages/tempHome/contact.php"><i class="fa-solid fa-fire"></i>Trending</a></li>
        </ul>
        <hr>
        <ul>
            <p class="nav-heading">Library</p>
            <!-- Favourites -->
            <li><a href="pages/tempHome/favourites.php"><i class="fa-solid fa-heart"></i>Favourites</a></li>
            <!-- Recently Played -->
            <li><a href="pages/tempHome/recentlyPlayed.php"><i class="fa-solid fa-history"></i>Recently Played</a></li>

        </ul>
        <hr>
        <ul>
            <p class="nav-heading">Playlists</p>
            <!-- My Playlists -->
            <div class="sidebar-playlist-container">
                <div class="playlist-card">
                    <img src="public/images/playlist-cover/playlist-cover.png" alt="">
                    <div class="playlist-info">
                        <p class="playlist-title">My Playlist</p>
                        <p class="no-of-songs">10 songs</p>
                    </div>
                </div>
                <div class="playlist-card">
                    <img src="public/images/playlist-cover/playlist-cover.png" alt="">
                    <div class="playlist-info">
                        <p class="playlist-title">My Playlist</p>
                        <p class="no-of-songs">10 songs</p>
                    </div>
                </div>
            </div>
        </ul>
    </nav>
    <header id="topNav">
        <button id="collapseExpandSidebar">
            <i class="fa-solid fa-bars-staggered"></i>
        </button>

    </header>
    <div id="musicControls">
        <div class="left">
            <img src="<?php echo $baseUrl ?>\public\images\song-cover\sarangi.jpg" alt="album art" class="music-cover">
            <div class="song-info">
                <h3 class="music-title">Saarangi</h3>
                <p class="music-artist">Sushant K.C</p>
            </div>
        </div>
        <div class="center">
            <div class="music-control-btns">
                <button class="shuffle-btn" data-shuffle="false">
                    <i class="fa-solid fa-shuffle"></i>
                </button>
                <button class="prev-btn">
                    <i class="fa-solid fa-backward-step"></i>
                </button>
                <button class="play-pause-btn">
                    <i class="fa-solid fa-circle-play" style="color: #ff7f11;"></i>
                </button>
                <button class="next-btn">
                    <i class="fa-solid fa-forward-step"></i>
                </button>
                <button class="repeat-btn" data-repeat="false">
                    <i class="fa-solid fa-repeat"></i>
                </button>
            </div>
            <div class="progress-bar">
                <p class="current-duration duration">00:00</p>
                <input type="range" name="" id="seekbar" min="0" max="100" value="0" step="0.001" class="range-slider">
                <p class="total-duration duration">03:00</p>

            </div>
        </div>
        <div class="right">
            <button class="like-btn" title="Add to Favourites" data-liked="false" data-musicId="2">
                <i class="fa-regular fa-heart"></i>
            </button>
            <button class="add-to-playlist-dialog-show-btn" title="Add to Playlist">
                <i class="fa-regular fa-list-music"></i>
            </button>
            <div class="volume-control">
                <button class="volume-btn">
                    <i class="fa-regular fa-volume-up"></i>
                </button>
                <div class="volume-slider">
                    <input type="range" name="" id="volume" min="0" max="100" value="100" step="0.001"
                        class="range-slider">
                </div>
            </div>
            <button class="expand-current-song" title="Expand">
                <i class="fa-regular fa-up-right-and-down-left-from-center"></i>
            </button>
        </div>
    </div>
    <script src="public/JS/script.js"></script>
    <script src="public/JS/temp-musicplayer.js"></script>
</body>

</html>