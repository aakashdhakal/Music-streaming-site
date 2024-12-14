<?php
include_once "database.php";
include_once "extraFunctions.php";
//upload music in database
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['song-name'];
    $genre = $_POST['genre'];
    $artist = $_SESSION['username'];
    $releaseDate = date('Y-m-d');
    $userId = $_SESSION['user_id'];


    if (isset($_FILES["song"]) && $_FILES["song"]["error"] == 0) {
        $song = $_FILES["song"];
        $fileName = createSlug($title) . "-music." . strtolower(pathinfo($song["name"], PATHINFO_EXTENSION));
        $songFilePath = uploadFile($song, 'music', $fileName);
    }


    if (isset($_FILES["song_cover"]) && $_FILES["song_cover"]["error"] == 0) {
        $songCover = $_FILES["song_cover"];
        $fileName = createSlug($title) . "-cover." . strtolower(pathinfo($songCover["name"], PATHINFO_EXTENSION));
        $songCoverFilePath = uploadFile($songCover, 'song_cover', $fileName);
    } else {
        // Default cover path for web access
        $songCoverFilePath = $webPath . "music.jpg";
    }

    $sql = "INSERT INTO musics (title, artist, genre, releaseDate, filePath, coverImage) VALUES (?, ?, ?, ?, ?,?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('ssssss', $title, $artist, $genre, $releaseDate, $songFilePath, $songCoverFilePath);
    $stmt->execute();
    if ($stmt->affected_rows == 1) {
        echo json_encode(['status' => 'success', 'message' => 'Music uploaded successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to upload music.']);
    }
    $stmt->close();

}

