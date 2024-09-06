<div class="side-bar">
    <div class="logo">
        <img src="<?php echo $baseUrl ?>/public/images/logo.svg" alt="logo">
    </div>
    <nav>
        <ul class="main-links nav-links">
            <li class="active">
                <button class="nav-btn" data-path="<?php echo $baseUrl ?>/pages/home/home.php">
                    <i class="fa-solid fa-house"></i>
                    Home</button>
            </li>
            <li>
                <button class="nav-btn">
                    <i class="fa-solid fa-compass"></i>
                    Discover
                </button>
            </li>
            <li>
                <button class="nav-btn">
                    <i class="fa-solid fa-music-note"></i>
                    Artists
                </button>
            </li>
            <li>
                <button class="nav-btn">
                    <i class="fa-solid fa-album-collection"></i>
                    Albums
                </button>
        </ul>
        <ul class="library-links nav-links">
            <?php
            if (!isset($_SESSION["user_id"])) {
                echo '<button class="secondary-btn login-form-show-btn">Login</button>
';
            } else {
                ?>
                <span class="nav-links-title">Library</span>

                <li>
                    <button class="nav-btn" data-path="<?php echo $baseUrl ?>/pages/Favourites/favourites.php">
                        <i class="fa-solid fa-heart"></i>
                        Favourites
                    </button>
                </li>
                <li>
                    <button class="nav-btn">
                        <i class="fa-solid fa-history"></i>
                        Recently Played
                    </button>
                </li>
            </ul>
            <ul class="playlist-links nav-links">
                <span class="nav-links-title">Playlists</span>


                <li class="playlists">
                    <?php
                    include_once '../../modules/getPlaylist.php' ?>
                </li>
                <?php
            }
            ?>
        </ul>

    </nav>
</div>