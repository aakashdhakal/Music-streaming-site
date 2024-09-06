<?php
include_once "../../modules/database.php";
include_once "../../modules/extraFunctions.php";

$sql = "SELECT *, COUNT(*) as plays 
        FROM music_history
        INNER JOIN musics ON music_history.music_id = musics.id
        INNER JOIN users ON musics.artist = users.username
        GROUP BY music_id 
        ORDER BY COUNT(*) DESC 
        LIMIT 5;";
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
            include "smallList.php";
        }
    } else {
        echo "<h1>No Trending Songs</h1>";
    }
} else {
    echo "Error: " . mysqli_error($mysqli);
}
