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
