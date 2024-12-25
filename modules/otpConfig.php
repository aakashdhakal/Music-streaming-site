<?php
include "database.php";
header('Content-Type: application/json');


use PHPMailer\PHPMailer\PHPMailer;

require 'vendor/phpmailer/src/Exception.php';
require 'vendor/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/src/SMTP.php';

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
                        <div class='container' style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;'>
                            <div class='header' style='text-align: center; margin-bottom: 20px;'>
                                <h1 style='font-size: 24px; color: #333;'>OTP Verification</h1>
                            </div>
                            <div class='content' style='font-size: 16px; color: #555;'>
                                <p>Dear User,</p>
                                <p>$message</p>
                                <div class='otp' style='font-size: 20px; font-weight: bold; color: #ff6a3a; margin: 20px 0;'>
                                    $otpCode
                                </div>
                                <p>This OTP is valid for 10 minutes. Please do not share this OTP with anyone.</p>
                            </div>
                            <div class='footer' style='font-size: 14px; color: #777; margin-top: 20px;'>
                                <p>If you did not request this, please ignore this email.</p>
                                <p>Thank you,<br>SANGEET</p>
                            </div>
                        </div>
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
                echo json_encode(["status" => 200, "message" => "OTP verified successfully"]);
            } else {
                echo json_encode(["status" => 400, "error" => "OTP expired"]);
            }

        } else {
            echo json_encode(["status" => 404, "error" => "Invalid OTP"]);
        }
    }
}
