<?php
include "database.php";
header('Content-Type: application/json');


use PHPMailer\PHPMailer\PHPMailer;

require '../vendor/phpmailer/src/Exception.php';
require '../vendor/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    if ($_POST['action'] == "sendOtp") {

        $otpCode = rand(100000, 999999);
        $email = $_POST['email'];
        $purpose = $_POST['purpose'];
        $sql = "INSERT INTO verify_email (otp, email) VALUES ('$otpCode', '$email')";
        $result = mysqli_query($mysqli, $sql);
        $message = "Welcome to SANGEET <br>Thank you for registering with us. Please use the following One-Time Password (OTP) to complete your verification process:";

        if ($purpose == "forgot") {
            $message = "Please use the following One-Time Password (OTP) to reset your password:";
        }

        $htmlContent = "
    <!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>OTP Verification</title>

</head>
<body>
   <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #dddddd;
            
        }
        .header h1 {
            margin: 0;
            color: #ff6a3a;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #666666;
            line-height: 1.5rem;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #ff6a3a;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            border-top: 1px solid #dddddd;
            margin-top: 20px;
        }
        .footer p {
            font-size: 14px;
            color: #999999;
          margin-top: 1rem;
        }
    </style>
    <div class='container'>
        <div class='header'>
            <h1>OTP Verification</h1>
        </div>
        <div class='content'>
            <p>Dear User,</p>
            <p>$message</p>
            <div class='otp'>$otpCode</div>
            <p>This OTP is valid for 10 minutes. Please do not share this OTP with anyone.</p>
        </div>
        <div class='footer'>
            <p>If you did not request this, please ignore this email.</p>
            <p>Thank you,<br>SANGEET</p>
        </div>
    </div>
</body>
</html>

    ";

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = "anoother124@gmail.com";
        $mail->Password = "ailfbddokyddbqhh";
        $mail->SMTPSecure = "ssl";
        $mail->Port = 465;

        $mail->setFrom("noreply@aakashdhakal.com.np");
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject = "Welcome to SANGEET";
        $mail->Body = $htmlContent;

        if ($mail->send()) {
            echo json_encode(["status" => 200]);
        } else {
            echo json_encode(["status" => 400, "error" => $mail->ErrorInfo]);
        }
    } else if ($_POST['action'] == "verifyOtp") {
        $otp = $_POST['otp'];
        $email = $_POST['email'];

        $sql = "SELECT * FROM verify_email WHERE otp = ? AND email = ?";
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param("is", $otp, $email);
        $stmt->execute();
        $result = $stmt->get_result();


        if (mysqli_num_rows($result) > 0) {
            $result = mysqli_fetch_assoc($result);
            $time = strtotime($result['time']);
            $curtime = time();
            $interval = $curtime - $time;
            if ($interval < 600) {
                $sql = "DELETE FROM verify_email WHERE otp = ? AND email = ?";
                $stmt = $mysqli->prepare($sql);
                $stmt->bind_param("is", $otp, $email);
                $stmt->execute();
                echo json_encode(["status" => 200]);
            } else {
                echo json_encode(["status" => 400, "error" => "OTP expired"]);
            }

        } else {
            echo json_encode(["status" => 404, "error" => "Invalid OTP"]);
        }
    }
}
