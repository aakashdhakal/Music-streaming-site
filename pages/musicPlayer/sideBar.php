<div class="side-bar">
    <div class="logo">
        <img src="/WEB-PROJECT/public/images/logo.svg" alt="logo">
    </div>
    <nav>
        <ul class="main-links nav-links">
            <li class="active">
                <a href="/WEB-PROJECT/pages/musicPlayer/playerHome.php">
                    <i class="fa-solid fa-house"></i>
                    Home</a>
            </li>
            <li>
                <a href="/WEB-PROJECT/pages/musicPlayer/playerLibrary.php">
                    <i class="fa-solid fa-compass"></i>
                    Discover</a>
            </li>
            <li>
                <a href="/WEB-PROJECT/pages/musicPlayer/playerPlaylist.php">
                    <i class="fa-solid fa-microphone"></i>
                    Artists</a>
            </li>
        </ul>
        <ul class="library-links nav-links">
            <span class="nav-links-title">Library</span>

            <!-- history -->
            <li>
                <a href="/WEB-PROJECT/pages/musicPlayer/playerHistory.php">
                    <i class="fa-solid fa-history"></i>
                    History</a>
            </li>
            <!-- favourites -->
            <li>
                <a href="/WEB-PROJECT/pages/musicPlayer/playerFavourites.php">
                    <i class="fa-regular fa-heart"></i>
                    Favourites</a>
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