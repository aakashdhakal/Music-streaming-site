<?php
$website_title = "Music Player";
include_once  "../head.php";
?>
<link rel="stylesheet" href="/WEB-PROJECT/public/CSS/player.css">
</head>

<body>
    <?php
    // include_once "sideBar.php";
    include_once "musicCard.php";
    ?>

    <div class="music-controls">
        <div class="controls">
            <div class="left">
                <img src="\WEB-PROJECT\public\images\song-cover\sarangi.jpg" alt="album art" class="music-cover">
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
                <button class="like-btn" title="Add to Favourites" data-liked="false">
                    <i class="fa-regular fa-heart"></i>
                </button>
                <button class="playlist-btn" title="Add to Playlist">
                    <i class="fa-solid fa-list-music"></i>
                </button>
                <div class="volume-control">
                    <button class="volume-btn">
                        <i class="fa-solid fa-volume"></i>
                    </button>
                    <input type="range" name="" id="volume" min="0" max="100" value="100" step="0.001" class="range-slider">
                </div>
            </div>
        </div>
    </div>
    <script src="/WEB-PROJECT/public/JS/musicPlayer.js"></script>
</body>