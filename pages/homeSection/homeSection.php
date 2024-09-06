<?php
$website_title = "Music Player";
$baseUrl = 'http://localhost/WEB-PROJECT';
include_once "../head.php";



?>
<link rel="stylesheet" href="<?php echo $baseUrl ?>/public/CSS/homeSection.css">
<link rel="stylesheet" href="<?php echo $baseUrl ?>/public/CSS/home.css">

</head>

<body>
    <?php
    include_once "sideBar.php";
    include_once "uploadMusicForm.php";
    include_once "login.php";
    ?>
    <main>
        <?php
        include_once "topnav.php";


        ?>
        <!-- Playlist Dialog -->
        <dialog id="addToPlaylistDialog">
            <button class="close-dialog-btn"> <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="max-width">
                <div class="playlist-lists">
                    <h2>Add to Playlist</h2>
                    <div class="playlists">
                        <?php
                        include '../../modules/getPlaylist.php' ?>
                    </div>
                </div>
            </div>
        </dialog>
        <?php include_once "createPlaylistForm.php"; ?>
        <div class="music-controls">
            <div class="left">
                <img src="<?php echo $baseUrl ?>\public\images\song-cover\sarangi.jpg" alt="album art"
                    class="music-cover">
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
                    <input type="range" name="" id="seekbar" min="0" max="100" value="0" step="0.001"
                        class="range-slider">
                    <p class="total-duration duration">03:00</p>

                </div>
            </div>
            <div class="right">
                <button class="like-btn" title="Add to Favourites" data-liked="false" data-musicId="2">
                    <i class="fa-regular fa-heart"></i>
                </button>
                <button class="add-to-playlist-dialog-show-btn" title="Add to Playlist">
                    <i class="fa-solid fa-list-music"></i>
                </button>
                <div class="volume-control">
                    <button class="volume-btn">
                        <i class="fa-solid fa-volume-up"></i>
                    </button>
                    <input type="range" name="" id="volume" min="0" max="100" value="100" step="0.001"
                        class="range-slider">
                </div>
            </div>
        </div>
        <section id="mainContent">
            <?php include_once "../home/home.php"; ?>
        </section>

    </main>


    <script src="<?php echo $baseUrl ?>/public/JS/script.js" class="main-script"></script>
    <script src="<?php echo $baseUrl ?>/public/JS/temp-musicPlayer.js"></script>
    <script src="<?php echo $baseUrl ?>/public/JS/uploadMusic.js"></script>
    <script src="<?php echo $baseUrl ?>/public/JS/login.js"></script>
    <script class="dynamic-script"></script>
</body>