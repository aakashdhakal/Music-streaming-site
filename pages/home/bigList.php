<div class="big-list-content">
    <div class="big-list-content-left">
        <img src="<?php echo $cover ?>" alt="album art" class="music-cover">
        <button class="play-music-btn start-play-music" data-musicId='<?php echo $musicId ?>'>
            <i class="fa-duotone fa-solid fa-circle-play"
                style="--fa-primary-color: #ffffff; --fa-secondary-color: #ff7f11; --fa-secondary-opacity: 1;"></i>
        </button>
    </div>
    <div class="big-list-content-right">
        <h3 class="music-title"><?php echo $title ?></h3>
        <p class="music-artist"><?php echo $artist ?></p>
        <p class="music-plays"><?php echo $plays ?></p>
    </div>
</div>