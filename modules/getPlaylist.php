<?php
include_once 'database.php';

$sql = "SELECT playlists.*, COUNT(playlist_songs.music_id) 
AS song_count 
FROM playlists 
LEFT JOIN playlist_songs 
ON playlist_songs.playlist_id = playlists.id 
WHERE playlists.user_id = ?
GROUP BY playlists.id;";


$stmt = mysqli_stmt_init($mysqli);
$stmt = $mysqli->prepare($sql);
$stmt->bind_param('i', $_SESSION['user_id']);
$stmt->execute();
$result = $stmt->get_result();
$showForm = isset($showForm) ? $showForm : false;
if (mysqli_num_rows($result) === 0) {
    echo '<br><p class="no-playlist">You have not created any playlist yet</p><br>';
} else {
    while ($row = mysqli_fetch_assoc($result)) {
        echo '
                    <div class="playlist-card" data-playlistId = "' . $row['id'] . '">
                    <img src="' . $row['cover'] . '" alt="" srcset="">
                    <div class="playlist-info">
                    <h3 class="playlist-title">' . $row['name'] . '</h3>
                    <p class="song-count"> <span class="count">' . $row['song_count'] . '</span> songs</p>
                    </div>
                    <!-----<button class="song-status-in-playlist">
                    </button> ------->
                    </div>
                    ';
    }
}
if (mysqli_num_rows($result) >= 3) {
    echo '<p class="max-reached">You can only create upto 3 playlists</p>';
} else {
    echo '<button class="show-create-playlist-dialog-btn secondary-btn"><iconify-icon icon="gridicons:create"></iconify-icon><p class="nav-text">Create Playlist</p></button>';

}
