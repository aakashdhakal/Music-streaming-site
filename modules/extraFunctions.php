<?php
if (!isset($_SESSION)) {
    session_start();
}
function isFavourites($musicId)
{
    if (isset($_SESSION['user_id'])) {
        require 'database.php';
        $userId = $_SESSION['user_id'];
        $sql = "SELECT * FROM favourite_songs WHERE user_id = ? AND song_id = ?";
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param('ii', $userId, $musicId);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return true;
        }
    }
    return false;
}

function checkSongInPlaylist($playlistId, $musicId)
{
    require 'database.php';
    $sql = "SELECT * FROM playlist_songs WHERE playlist_id = ? AND music_id = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('ii', $playlistId, $musicId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        return true;
    }
    return false;
}

function getFullName($userName)
{
    require 'database.php';
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('s', $userName);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['firstname'] . ' ' . $row['lastname'];
}

function createSlug($string)
{
    // Convert the string to lowercase
    $string = strtolower($string);
    // Remove special characters
    $string = preg_replace('/[^a-z0-9\s-]/', '', $string);
    // Replace multiple spaces or hyphens with a single hyphen
    $string = preg_replace('/[\s-]+/', ' ', $string);
    // Replace spaces with hyphens
    $string = preg_replace('/\s/', '-', $string);
    return $string;
}

function uploadFile($file, $type, $fileName)
{
    switch ($type) {
        case 'music':
            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . "/WEB-PROJECT/public/music/";
            $webPath = "/WEB-PROJECT/public/music/"; // Path for web access
            break;
        case 'playlist_cover':
            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . "/WEB-PROJECT/public/images/playlist-cover/";
            $webPath = "/WEB-PROJECT/public/images/playlist-cover/"; // Path for web access
            break;
        case 'song_cover':
            $uploadDir = $_SERVER['DOCUMENT_ROOT'] . "/WEB-PROJECT/public/images/song-cover/";
            $webPath = "/WEB-PROJECT/public/images/song-cover/"; // Path for web access
            break;
        default:
            echo "Invalid file type.";
            return;
    }
    $uploadFilePath = $uploadDir . $fileName; // Absolute path for file operations
    $uploadFileWebPath = $webPath . $fileName; // Relative path for database and web usage

    if (!move_uploaded_file($file["tmp_name"], $uploadFilePath)) {
        // Handle error if file wasn't moved successfully
        echo "Failed to upload file.";
        return;
    } else {
        return $uploadFileWebPath;
    }
}
