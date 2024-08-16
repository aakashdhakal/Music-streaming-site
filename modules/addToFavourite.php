<?php
include_once 'database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
        $musicId = $_POST['musicId'];
        if ($_POST['action'] == 'like') {
            $sql = "INSERT INTO favourite_songs (user_id, song_id) VALUES (?, ?)";
        } else {
            $sql = "DELETE FROM favourite_songs WHERE user_id = ? AND song_id = ?";
        }
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param('ii', $userId, $musicId);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => $mysqli->error]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    }
}
