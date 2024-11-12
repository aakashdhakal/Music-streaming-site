<?php
include "database.php";

use PHPMailer\PHPMailer\PHPMailer;

require '../vendor/phpmailer/src/Exception.php';
require '../vendor/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    if ($_POST['action'] == "sendOtp") {

        $otpCode = rand(100000, 999999);
        $email = $_POST['email'];
        $username = $_POST['username'];
        echo $otpCode . $email . $username;

        $sql = "INSERT INTO verify_email (otp, username) VALUES ('$otpCode', '$username')";
        $result = mysqli_query($mysqli, $sql);

        $htmlContent = "
      <!DOCTYPE html>
   <html lang='en'>

   <head>
       <meta charset='UTF-8'>
       <meta name='viewport' content='width=device-width, initial-scale=1.0'>
       <title>Document</title>
   </head>

   <body style='margin:auto;padding:20px;border:2px dashed black;width:40%;color:black;'>
           <img src='https://raw.githubusercontent.com/aakashdhakal/Music-streaming-site/887b3a2a1071d3fee985de3b8568aa9c27b10244/public/images/logo-title-side.svg' width='50%' height='120px' style='margin-left: auto; object-fit:cover'>
           <section id='body' style='width: 83%; padding: 40px; font-family:Tahoma; margin: auto;'>
               <p style='font-size: 1rem; font-weight: 500; letter-spacing: 1px; line-height: 2;'>Hello &nbsp;<span style='font-weight: 700;'>" . $username . "</span></p>
               <p style='font-size: 1rem; font-weight: 500; letter-spacing: 1px; line-height: 2;'>Welcome to SANGEET. Your verification code is : <span style='font-weight: 70'>" . $otpCode . "</span></p>
               <p style='font-size: 1rem; font-weight: 500; letter-spacing: 1px; line-height: 2;'>Thank you <br> The SANGEET Team</p>
           </section>
           <hr style='width: 83%; margin: 30px auto 30px;'>
           <section id='copyright' style='width: 83%; margin: auto;'>
               <p style='width: 100%; font-size: 0.9rem; font-weight: 500; letter-spacing: 1px; line-height: 1.8; color: gray; text-align: center;'>Copyright &copy; " . date('Y') . " Aakash Dhakal. All rights reserved.</p>
           </section>

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
        $mail->Subject = "Welcome to A.D Blogs";
        $mail->Body = $htmlContent;

        if ($mail->send()) {
            echo "success";
        } else {
            echo "Error occured" . $mail->ErrorInfo;
        }
    } else if ($_POST['action'] == "verifyOtp") {
        $otp = $_POST['otp'];
        $username = $_POST['username'];

        $sql = "SELECT * FROM verify_email WHERE otp = '$otp' AND username = '$username'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
        } else {
            echo "Invalid OTP";
        }
    }
}
