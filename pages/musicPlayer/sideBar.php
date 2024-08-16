<div class="side-bar">
    <div class="logo">
        <img src="/WEB-PROJECT/public/images/logo.svg" alt="logo">
    </div>
    <nav>
        <ul class="main-links nav-links">
            <li class="active">
                <button class="nav-btn" data-path="/WEB-PROJECT/pages/home/home.php">
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
            <span class="nav-links-title">Library</span>
            <li>
                <button class="nav-btn">
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
        </ul>

    </nav>
</div>