<!DOCTYPE html>
<html lang="en">
<?php if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
$_SESSION['userId'] = 1;
$_SESSION['name'] = "Aakash Dhakal";
$website_title = "Sangeet- The Heartbeat of Music";
include_once "pages/head.php"
; ?>
<link rel="stylesheet" href="public/CSS/home.css">
</head>

<body>
    <!-- <?php
    include_once "pages/preloader.php";
    ?> -->
    <nav id="sideNav">
        <div class="logo-container">
            <a href="
                    <?php echo $baseUrl ?>">
            </a>
        </div>
        <ul>
            <li class="active">
                <a href="pages/tempHome/home.php">
                    <iconify-icon icon="fluent:home-24-filled"></iconify-icon>Home
                </a>
            </li>
            <li>
                <a href="pages/tempHome/about.php">
                    <iconify-icon icon="mingcute:compass-fill"></iconify-icon>Discover
                </a>
            </li>
            <li>
                <a href="pages/tempHome/contact.php">
                    <iconify-icon icon="mage:fire-b-fill"></iconify-icon>Trending
                </a>
            </li>
        </ul>
        <hr>
        <ul>
            <p class="nav-heading">Library</p>
            <!-- Favourites -->
            <li>
                <a href="pages/tempHome/favourites.php">
                    <iconify-icon icon="si:heart-fill"></iconify-icon>Favourites
                </a>
            </li>
            <!-- Recently Played -->
            <li>
                <a href="pages/tempHome/recentlyPlayed.php">
                    <iconify-icon icon="akar-icons:history"></iconify-icon>History
                </a>
            </li>
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
        <div class="left">
            <button id="collapseExpandSidebar">
                <i class="fa-solid fa-bars-staggered"></i>
            </button>
        </div>
        <div class="right">
            <button class="dark-mode-btn">
                <iconify-icon icon="iconamoon:mode-dark"></iconify-icon>
            </button>
            <button class="notification-btn">
                <iconify-icon icon="ph:bell-bold"></iconify-icon>
            </button>
            <button class="profile-btn">
                <img src="public\images\profile-pics\profile.jpeg" alt="profile-pic">
            </button>
        </div>
        <div id="notificationWindow">
            <div class="notification-header">
                <h3>Notifications</h3>
                <button class="mark-all-as-read"> Mark all as read <iconify-icon
                        icon="charm:circle-tick"></iconify-icon>
                </button>
            </div>
            <hr>
            <div class="notification-body"></div>
            <button id="seeAllNotifications" class="primary-btn"> See all notifications <iconify-icon
                    icon="akar-icons:arrow-right"></iconify-icon>
            </button>
        </div>
        <div id="profileWindow">
            <ul>
                <li>
                    <a href="pages/tempHome/profile.php">
                        <iconify-icon icon="bi:person-circle"></iconify-icon>Profile
                    </a>
                </li>
                <li>
                    <a href="pages/tempHome/settings.php">
                        <iconify-icon icon="bi:gear-wide-connected"></iconify-icon>Settings
                    </a>
                </li>
                <li>
                    <a href="pages/tempHome/help.php">
                        <iconify-icon icon="bi:question-circle"></iconify-icon>Help
                    </a>
                </li>
                <li>
                    <a href="pages/tempHome/logout.php">
                        <iconify-icon icon="bi:box-arrow-right"></iconify-icon>Logout
                    </a>
                </li>
            </ul>
        </div>
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
                    <i class="fa-regular fa-shuffle"></i>
                </button>
                <button class="prev-btn">
                    <i class="fa-regular fa-backward-step"></i>
                </button>
                <button class="play-pause-btn">
                    <i class="fa-solid fa-circle-play" style="color: #ff7f11;"></i>
                </button>
                <button class="next-btn">
                    <i class="fa-regular fa-forward-step"></i>
                </button>
                <button class="repeat-btn" data-repeat="false">
                    <i class="fa-regular fa-repeat"></i>
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
                <iconify-icon icon="iconoir:heart"></iconify-icon></button>
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
    <main>
        <section id="featuredTrending">
            <div class="featured-banner">
                <p class="trending-text">#1 Trending in Nepal</p>
                <div class="banner-content">
                    <div class="song-info">
                        <h1 class="song-title">SAARANGI </h1>
                        <p class="artist-name">Sushant K.C </p>
                    </div>
                    <div class="btn-container">
                        <button class="primary-btn start-play-music" data-musicId="1"><iconify-icon
                                icon="mingcute:headphone-fill"></iconify-icon>Listen Now</button>
                        <button class="add-to-playlist-btn secondary-btn"><iconify-icon
                                icon="tabler:playlist-add"></iconify-icon></button>
                    </div>
                </div>
                <div class="banner-image">
                    <img src="public/images/sushantkc.png" alt="banner-image">
                </div>
            </div>
            <div class="trending-songs">
                <h2 class="section-title"><iconify-icon icon="fluent:arrow-trending-12-filled"></iconify-icon>Top
                    Trending
                    Songs
                </h2>
                <div class="song-card-container trending-songs-container">
                    <?php for ($i = 0; $i < 4; $i++) { ?>
                        <div class="song-list">
                            <img src="<?php echo $baseUrl ?>/public/images/song-cover/sarangi.jpg" alt="" srcset="">
                            <div class="song-info">
                                <p class="music-title">Saarangi</p>
                                <!-- <p class="artist-name">Sushant K.C</p> -->
                            </div>
                            <div class="song-options btn-container">
                                <button class="start-play-music" data-musicId="2"><iconify-icon
                                        icon="fluent:play-circle-24-filled"></iconify-icon></button>
                                <button class="add-to-playlist-btn"><iconify-icon icon="tabler:playlist-add"></iconify-icon>
                                </button>
                            </div>
                        </div>
                    <?php } ?>
                </div>
            </div>

        </section>
        <section id="recentTopArtist">
            <div class="recent-songs">
                <h2 class="section-title"> <iconify-icon icon="akar-icons:history"></iconify-icon>Recently Played
                </h2>
                <div class="recent-songs-container song-card-container">
                    <?php for ($i = 0; $i < 8; $i++) { ?>
                        <div class="song-card">
                            <img src="<?php echo $baseUrl ?>/public/images/song-cover/sarangi.jpg" alt="" srcset="">
                            <button class="start-play-music" data-musicId="2"><iconify-icon
                                    icon="gravity-ui:play-fill"></iconify-icon></button>
                            <div class="song-info">
                                <p class="music-title">Saarangi</p>
                            </div>

                        </div>
                    <?php } ?>
                </div>
            </div>
            <div class="top-album">
                <h2 class="section-title"><iconify-icon icon="iconoir:album-open"></iconify-icon>Top Album
                </h2>
                <div class="playlist-image">
                    <img src="<?php echo $baseUrl ?>/public/images/playlist-cover/playlist-cover.png" alt="">
                </div>
                <div class="playlist-info">
                    <p class="playlist-title">My Playlist</p>
                    <p class="no-of-songs">10 songs</p>
                </div>
            </div>


            </div>
        </section>
    </main>
    <script src="public/JS/script.js"></script>
    <script src="public/JS/home.js"></script>
    <script src="public/JS/temp-musicplayer.js"></script>
</body>

</html>