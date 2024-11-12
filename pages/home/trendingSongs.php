<?php
include_once realpath($_SERVER["DOCUMENT_ROOT"]) . "/WEB-PROJECT/modules/database.php";
include_once realpath($_SERVER["DOCUMENT_ROOT"]) . "/WEB-PROJECT/modules/extraFunctions.php";
$sql = 'SELECT *, COUNT(*) as plays 
        FROM music_history
        INNER JOIN musics ON music_history.music_id = musics.id
        INNER JOIN users ON musics.artist = users.username
        GROUP BY music_id 
        ORDER BY COUNT(*) DESC 
        LIMIT 5;';
$result = mysqli_query($mysqli, $sql);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        $i = 1;
        while ($row = mysqli_fetch_assoc($result)) {
            $cover = $row['coverImage'];
            $title = $row['title'];
            $artist = getFullName($row['artist']);
            $musicId = $row['music_id'];
            $plays = $row['plays'];

            echo "
             <div class='song-list-wrapper'>
             <p class='song-number'>#" . $i++ . "</p>
            <div class='song-list'>
    <img src='$cover' alt=' srcset='>
    <button class='start-play-music' data-musicId='$musicId'><iconify-icon icon='gravity-ui:play-fill'></iconify-icon></button>
    <div class='song-info'>
        <p class='music-title'>$title</p>
        <p class='artist-name'>$artist</p>
    </div>
    <div class='song-options btn-container'>
        <button class='like-btn' title='Add to Favourites' data-liked='false' data-musicId='2'>
            <iconify-icon icon='fe:heart-o'></iconify-icon></button>
        <button class='add-to-playlist-btn' title='Add to Playlist' data-musicId='2'>
            <iconify-icon icon='tabler:playlist-add'></iconify-icon></button>
</div>
    </div>
</div>
            ";
        }
    } else {
        echo '<h1>No Trending Songs</h1>';
    }
} else {
    echo 'Error: ' . mysqli_error($mysqli);
}