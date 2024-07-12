<?php
include_once "../../modules/database.php";

$sql = "SELECT id,title FROM musics";
$result = mysqli_query($mysqli, $sql);
while ($musics = mysqli_fetch_assoc($result)) {
    echo "<button class='start-play-music' data-musicId='" . $musics["id"] . "'>" . $musics['title'] . "</button>";
}
