<?php
include_once "../../modules/database.php";
include_once "../../modules/extraFunctions.php";
$sql = "SELECT music_history.music_id, musics.*, MAX(music_history.id) as max_id
        FROM music_history 
        INNER JOIN musics ON music_history.music_id = musics.id 
        WHERE user_id = ? 
        GROUP BY music_history.music_id
        ORDER BY max_id DESC 
        LIMIT 3";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param('i', $_SESSION['user_id']);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows != 0) {

    echo "
     <div class=' recently-played'>
                    <h1 class='title'>Recently Played</h1>
                    <div class='music-card-container'>
    ";

    while ($row = $result->fetch_assoc()) {
        $cover = $row['coverImage'];
        $title = $row['title'];
        $artist = getFullName($row['artist']);
        $musicId = $row['music_id'];
        include "smallList.php";
    }
    echo "</div></div>";
}