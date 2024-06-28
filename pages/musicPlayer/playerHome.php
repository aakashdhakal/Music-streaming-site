<?php
$website_title = "Music Player";
include_once  "../head.php";
?>
<link rel="stylesheet" href="/WEB-PROJECT/public/CSS/player.css">
</head>

<body>
    <!-- <?php
            include_once "sideBar.php";
            ?> -->
    <button class="start-play-music" data-source="/WEB-PROJECT/public/music/Saarangi-Sushant-K.C.mp3">Saarangi</button>
    <button class="start-play-music" data-source="/WEB-PROJECT/public/music/Kya-Kardiya-sushant-kc.m4a">Kya Kardiya</button>

    <div class="music-controls">
        <input type="range" name="" id="seekbar" min="0" max="100" value="0" step="0.000000000000001">
        <div class="controls">
            <div class="left">
                <img src="/WEB-PROJECT/public/images/song-cover/sarangi.jpg" alt="album art">
                <div class="song-info">
                    <h3 class="song-title">Saarangi</h3>
                    <p class="artist-name">Sushant K.C</p>
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
                        <i class="fa-solid fa-volume-up"></i>
                    </button>
                    <input type="range" name="" id="volume" min="0" max="100" value="100" step="1">
                </div>
            </div>
        </div>
    </div>
    <script src="/WEB-PROJECT/public/JS/musicPlayer.js"></script>
</body>