<?php
//logout user
session_destroy();
header("Location: ../index.php");
