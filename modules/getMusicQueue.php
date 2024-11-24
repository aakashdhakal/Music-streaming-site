<?php
include_once 'database.php';
//fetch random music queue
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "SELECT id FROM musics ORDER BY RAND() LIMIT 10";
    $stmt = $mysqli->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $songs = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $songs[] = $row;
    }
    echo json_encode($songs);
} else {
    echo json_encode(["error" => "Invalid request method"]);
}