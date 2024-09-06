<?php
include_once "../../modules/database.php";
include_once "../../modules/extraFunctions.php";

$sql = "SELECT * FROM musics ORDER BY RAND() LIMIT 12";
$stmt = $mysqli->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows != 0) {
    while ($row = $result->fetch_assoc()) {
        $cover = $row['coverImage'];
        $title = $row['title'];
        $artist = getFullName($row['artist']);
        $musicId = $row['id'];
        include "musicCard.php";
    }
}