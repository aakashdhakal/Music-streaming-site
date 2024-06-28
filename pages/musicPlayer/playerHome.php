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
        <input type="range" name="" id="seekbar" min="0" max="100" value="0" step="0.001">
        <div class="controls">
            <div class="left">
                <img src="" alt="album art" class="music-cover">
                <div class="song-info">
                    <h3 class="music-title">Saarangi</h3>
                    <p class="music-artist">Sushant K.C</p>
                </div>
            </div>
            <div class="center">
                <button class="shuffle-btn" data-shuffle="false">
                    <i class="fa-solid fa-shuffle"></i>
                </button>
                <button class="prev-btn">
                    <i class="fa-solid fa-backward"></i>
                </button>
                <button class="play-pause-btn">
                    <i class="fa-regular fa-circle-play fa-2xl"></i> </button>
                <button class="next-btn">
                    <i class="fa-solid fa-forward"></i>
                </button>
                <button class="repeat-btn" data-repeat="false">
                    <i class="fa-solid fa-repeat"></i>
                </button>

            </div>
            <div class="right">
                <span class="duration">
                    <p class="current-duration">00:00</p>/
                    <p class="total-duration">03:00</p>
                </span>
                <div class="volume-control">
                    <button class="volume-btn">
                        <i class="fa-duotone fa-volume-high"></i>
                    </button>
                    <input type="range" name="" id="volume" min="0" max="100" value="100" step="0.001">
                </div>
            </div>
        </div>
    </div>
    <script src="/WEB-PROJECT/public/JS/musicPlayer.js"></script>
</body>