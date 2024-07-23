<?php
$website_title = "Music Player";
include_once "../head.php";

if (!isset($_SESSION['user_id'])) {
    header("Location: /WEB-PROJECT/index.php");
}

?>
<link rel="stylesheet" href="/WEB-PROJECT/public/CSS/player.css">
</head>

<body>
    <?php
    include_once "sideBar.php";
    ?>
    <main>
        <?php
        include_once "musicCard.php";
        ?>
        <!-- Plylist Dialog -->
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
        <dialog id="createNewPlaylistDialog">
            <button class="close-dialog-btn"> <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="max-width">
                <h2>Create New Playlist</h2>
                <form action="" method="POST" class="create-playlist-form" enctype="multipart/form-data">
                    <div class="form-group playlist-name">
                        <input type="text" name="playlist-name" placeholder="" required>
                        <label for="playlist-name">Playlist Name</label>
                    </div>
                    <div class="form-group playlist-description">
                        <input type="text" name="playlist-description" placeholder="">
                        <label for="playlist-description">Description</label>
                    </div>
                    <div class="custom-file-upload">
                        <input type="file" id="fileUpload" name="playlist_cover" hidden />
                        <label for="fileUpload">Upload Cover</label>
                        <img src="\WEB-PROJECT\public\images\playlist-cover\playlist-cover.png" alt=""
                            class="preview-image">
                    </div>
                    <button type="submit" class="create-playlist-btn">Create Playlist</button>
                </form>
            </div>
        </dialog>
        <div class="music-controls">
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
                    <input type="range" name="" id="seekbar" min="0" max="100" value="0" step="0.001"
                        class="range-slider">
                    <p class="total-duration duration">03:00</p>

                </div>
            </div>
            <div class="right">
                <button class="like-btn" title="Add to Favourites" data-liked="false" data-m>
                    <i class="fa-regular fa-heart"></i>
                </button>
                <button class="playlist-btn" title="Add to Playlist">
                    <i class="fa-solid fa-list-music"></i>
                </button>
                <div class="volume-control">
                    <button class="volume-btn">
                        <i class="fa-solid fa-volume"></i>
                    </button>
                    <input type="range" name="" id="volume" min="0" max="100" value="100" step="0.001"
                        class="range-slider">
                </div>
            </div>
        </div>
    </main>



    <script src="/WEB-PROJECT/public/JS/musicPlayer.js"></script>
    <script src="/WEB-PROJECT/public/JS/script.js"></script>
</body>