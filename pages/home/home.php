<div class="left">
    <div class="featured-banner">
        <div class="banner-content">
            <h1>KYA KARDIYA</h1>
            <p>Sushant K.C . <span>12.5M plays</span></p>
            <button class="primary-btn start-play-music" data-musicId="2"> <i class="fa-solid fa-play"></i>
                Play
                Now</button>

        </div>
        <img src="/WEB-PROJECT/public/images/sushantkc.png" alt="">
    </div>
    <?php
    include 'recentlyPlayed.php';
    ?>

    <div class="recommended-music">
        <h1 class="title">Recommended</h1>
        <div class="music-card-container">
            <?php
            include 'recommendedSongs.php';
            ?>
        </div>
    </div>
</div>
<div class="right">
    <div class="top-playlist">
        <h1 class="title">Trending</h1>
        <div class="playlist-card-container">
            <?php
            include 'trendingSongs.php';
            ?>
        </div>
    </div>
</div>