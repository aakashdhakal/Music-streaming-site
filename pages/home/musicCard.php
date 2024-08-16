<div class='music-card'>
    <div class='music-content'>
        <img src="<?php echo $cover ?>" alt='album art' class='music-cover'>
        <button class='start-play-music' data-musicId='<?php echo $musicId ?>'>
            <i class='fa-duotone fa-solid fa-circle-play'
                style='--fa-primary-color: #ffffff; --fa-secondary-color: #ff7f11; --fa-secondary-opacity: 1;'></i>
        </button>
        <div class='song-info'>
            <h3 class='music-title' title="<?php echo $title . ' - ' . $artist ?>"><?php echo $title ?></h3>
            <p class='music-artist'><?php echo $artist ?></p>
        </div>

    </div>

</div>