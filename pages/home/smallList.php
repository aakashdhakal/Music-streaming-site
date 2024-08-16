<div class='small-list-content'>
    <?php
    if (isset($i)) {
        echo "<p class='music-plays'>#$i</p>";
        $i++;
    }
    ?>
    <div class='recently-played-content' title="<?php echo "$title - $artist" ?>">
        <img src='<?php echo $cover ?>' alt='album art' class='music-cover'>
        <div class='song-info'>
            <h3 class='music-title'><?php echo $title ?></h3>
            <p class='music-artist'><?php echo $artist ?></p>
        </div>

    </div>
    <button class='play-music-btn start-play-music' data-musicId='<?php echo $musicId ?>'>
        <i class='fa-duotone fa-solid fa-circle-play'
            style='--fa-primary-color: #ffffff; --fa-secondary-color: #ff7f11; --fa-secondary-opacity: 1;'></i>
    </button>
</div>