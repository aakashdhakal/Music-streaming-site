<?php
session_start();
if (isset($_SESSION["user_id"])) {
    echo "true";
} else {
    echo "false";
}