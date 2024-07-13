<?php
include_once '../../modules/database.php';

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
// while($row = mysqli_fetch_assoc($result)){
//     echo '
//     <div class="playlist-card">
//     <img src="'. $row['cover'] .'" alt="" srcset="">
//         <h3 class="playlist-title">'.$row['name'].'</h3>
//         <button class="start-playlist" data-playlistId="'.$row['id'].'">Play</button>
//     </div>
//     ';
// }

?>
<dialog id="addToPlaylistDialog">
    <button class="close-dialog-btn"> <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="max-width">
        <div class="add-to-playlist">
            <h2>Add to Playlist</h2>
            <div class="playlists">
                <?php
                while ($row = mysqli_fetch_assoc($result)) {
                    echo '
                    <div class="playlist-card">
                    <img src="' . $row['cover'] . '" alt="" srcset="">
                    <div class="playlist-info">
                    <h3 class="playlist-title">' . $row['name'] . '</h3>
                    <p class="song-count">' . $row['song_count'] . ' songs</p>
                    </div>
                    </div>
                    ';
                }
                ?>
            </div>
        </div>
        <div class="create-playlist">
            <h2>Create Playlist</h2>
            <form action="" method="post">
                <div class="input-field">
                    <input type="text" name="playlist-name" id="playlist-name" placeholder="Playlist Name">
                </div>
                <button type="submit" class="create-playlist-btn"><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Create
                    Playlist</button>
            </form>
        </div>
    </div>
</dialog>