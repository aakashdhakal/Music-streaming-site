<?php
include_once 'database.php';
include_once 'extraFunctions.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $playlistName = $_POST['playlist-name'];
    $userId = $_SESSION['user_id'];
    $cover = '/WEB-PROJECT/public/images/playlist-cover.png';
    $sql = "INSERT INTO playlists (name, user_id,cover) VALUES (?, ?, ?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('sis', $playlistName, $userId, $cover);
    $stmt->execute();
    if ($stmt->affected_rows === 0) {
        echo json_encode(['status' => 'error', 'code' => 500]);
        exit();
    } else {
        echo json_encode(['status' => 'success']);
    }
}