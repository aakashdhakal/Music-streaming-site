<?php
include_once 'database.php';
include_once 'extraFunctions.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $playlistName = $_POST['playlist-name'];
    $userId = $_SESSION['user_id'];

    // Convert to absolute path using the document root
    $uploadDir = $_SERVER['DOCUMENT_ROOT'] . "/WEB-PROJECT/public/images/playlist-cover/";
    $webPath = "/WEB-PROJECT/public/images/playlist-cover/"; // Path for web access

    if (isset($_FILES["playlist_cover"]) && $_FILES["playlist_cover"]["error"] == 0) {
        $playlistCover = $_FILES["playlist_cover"];
        $fileName = $userId . "-" . $playlistName . rand(1000, 1000000) . "." . strtolower(pathinfo($playlistCover["name"], PATHINFO_EXTENSION));
        $uploadFilePath = $uploadDir . $fileName; // Absolute path for file operations
        $webFilePath = $webPath . $fileName; // Relative path for database and web usage

        if (!move_uploaded_file($playlistCover["tmp_name"], $uploadFilePath)) {
            // Handle error if file wasn't moved successfully
            echo json_encode(['status' => 'error', 'message' => 'Failed to upload file.']);
            exit;
        }
    } else {
        // Default cover path for web access
        $webFilePath = $webPath . "playlist-cover.png";
    }

    $sql = "INSERT INTO playlists (name, user_id, cover) VALUES (?, ?, ?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('sis', $playlistName, $userId, $webFilePath); // Use web accessible path
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'code' => 500]);
    }
}