-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2024 at 07:38 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `favourite_songs`
--

CREATE TABLE `favourite_songs` (
  `id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favourite_songs`
--

INSERT INTO `favourite_songs` (`id`, `song_id`, `user_id`) VALUES
(6, 3, 1),
(21, 0, 3),
(22, 3, 3),
(30, 2, 3),
(31, 10, 3),
(32, 11, 3);

-- --------------------------------------------------------

--
-- Table structure for table `musics`
--

CREATE TABLE `musics` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `artist` text DEFAULT NULL,
  `genre` text DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `releaseDate` date DEFAULT NULL,
  `filePath` text DEFAULT NULL,
  `coverImage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `musics`
--

INSERT INTO `musics` (`id`, `title`, `artist`, `genre`, `duration`, `releaseDate`, `filePath`, `coverImage`) VALUES
(1, 'Sarangi', 'sushantkc', 'folk', '04:42:00', NULL, '/WEB-PROJECT/public/music/Saarangi-Sushant-K.C.mp3', '/WEB-PROJECT/public/images/song-cover/sarangi.jpg'),
(2, 'Kya Kardiya', 'sushantkc', 'pop', '03:26:00', '2024-06-04', '/WEB-PROJECT/public/music/Kya-Kardiya-sushant-kc.m4a', '/WEB-PROJECT/public/images/song-cover/kyakardiya.jpg'),
(3, 'Blinding Lights', 'theweekend', 'pop', '03:26:00', '2024-06-04', '/WEB-PROJECT/public/music/Blinding-Lights.mp3', '/WEB-PROJECT/public/images/song-cover/blindinglights.jpg'),
(11, 'Cheap Thrills', 'aakashdhakal', 'english', '00:00:00', '2024-08-07', '/WEB-PROJECT/public/music/song-3876176.m4a', '/WEB-PROJECT/public/images/song-cover/music.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `music_history`
--

CREATE TABLE `music_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `music_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `music_history`
--

INSERT INTO `music_history` (`id`, `user_id`, `music_id`) VALUES
(68, 3, 11),
(71, 3, 11),
(72, 3, 11),
(74, 3, 2),
(76, 3, 11),
(78, 3, 2),
(80, 3, 11),
(81, 3, 11),
(82, 3, 3),
(83, 3, 11),
(84, 3, 11),
(85, 3, 11);

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `creation_date` date NOT NULL DEFAULT current_timestamp(),
  `cover` text NOT NULL,
  `description` text NOT NULL,
  `visibility` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `user_id`, `name`, `creation_date`, `cover`, `description`, `visibility`) VALUES
(50, 3, 'Aakash\'s Playlist', '2024-07-29', '/WEB-PROJECT/public/images/playlist-cover/3-Aakash\'s Playlist948726.jpeg', '', 'private');

-- --------------------------------------------------------

--
-- Table structure for table `playlist_songs`
--

CREATE TABLE `playlist_songs` (
  `id` int(11) NOT NULL,
  `music_id` int(11) NOT NULL,
  `playlist_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlist_songs`
--

INSERT INTO `playlist_songs` (`id`, `music_id`, `playlist_id`) VALUES
(53, 2, 50);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `profile_picture` text NOT NULL,
  `bio` text NOT NULL,
  `is_artist` tinyint(1) NOT NULL,
  `isVerified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `firstname`, `lastname`, `dob`, `gender`, `email`, `profile_picture`, `bio`, `is_artist`, `isVerified`) VALUES
(1, 'sushantkc', 'kjhekajhksjdhak', 'Shusant', 'K.C', '1997-01-01', 'male', 'helloworld@gmail.com', '', '', 1, 1),
(2, 'theweekend', 'kjhekajhksjdhak', 'The', 'Weekend', '1997-01-01', 'male', 'helloworld@gmail.com', '', '', 1, 1),
(3, 'aakashdhakal', 'helloworld', 'Aakash', 'Dhakal', '1997-01-01', 'male', 'helloworld@gmail.com', '/WEB-PROJECT/public/images/profile-pics/profile.jpeg', '', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `verify_email`
--

CREATE TABLE `verify_email` (
  `id` int(11) NOT NULL,
  `otp` int(11) NOT NULL,
  `username` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `verify_email`
--

INSERT INTO `verify_email` (`id`, `otp`, `username`, `time`) VALUES
(1, 405079, '', '2024-06-18 16:44:53'),
(2, 978427, 'aakashdhakal', '2024-06-18 16:45:29'),
(3, 864865, 'aakashdhakal', '2024-06-18 16:46:10'),
(4, 903266, 'aakashdhakal', '2024-06-18 16:46:50'),
(5, 607351, 'aakashdhakal', '2024-06-18 16:47:51'),
(6, 401357, 'aakashdhakal', '2024-06-18 16:49:58'),
(7, 414299, 'aakashdhakal', '2024-06-18 16:51:15'),
(8, 710958, 'aakashdhakal', '2024-06-18 16:52:16'),
(9, 454373, 'aakashdhakal', '2024-06-18 16:52:50'),
(10, 520790, 'aakashdhakal', '2024-06-18 16:53:35'),
(11, 736019, 'aakashdhakal', '2024-06-18 16:54:31'),
(12, 942408, 'aakashdhakal', '2024-06-18 16:57:02'),
(13, 499299, 'aakashdhakal', '2024-06-18 16:58:34'),
(14, 270319, 'aakashdhakal', '2024-06-18 17:05:08'),
(15, 330480, 'aakashdhakal', '2024-06-18 17:05:52'),
(16, 745888, 'aakashdhakal', '2024-06-18 17:18:25'),
(17, 450615, 'aakashdhakal', '2024-06-18 17:19:43'),
(18, 679353, 'aakashdhakal', '2024-06-18 17:21:30'),
(19, 941092, 'aakashdhakal', '2024-06-18 17:22:38'),
(20, 608167, 'aakashdhakal', '2024-06-18 17:23:28'),
(21, 342045, 'aakashdhakal', '2024-06-18 17:24:27'),
(22, 477263, 'aakashdhakal', '2024-06-18 17:25:07'),
(23, 211103, 'aakashdhakal', '2024-06-18 17:26:16'),
(24, 772820, 'aakashdhakal', '2024-06-18 17:27:05'),
(25, 973961, 'aakashdhakal', '2024-06-18 17:27:45'),
(26, 677398, 'aakashdhakal', '2024-06-18 17:28:06'),
(27, 215693, 'aakashdhakal', '2024-06-18 17:28:36'),
(28, 649625, 'aakashdhakal', '2024-06-18 17:29:46'),
(29, 244490, 'aakashdhakal', '2024-06-18 17:34:28'),
(30, 719899, 'aakashdhakal', '2024-06-18 17:35:00'),
(31, 240973, 'aakashdhakal', '2024-06-18 17:36:16'),
(32, 659041, 'aakashdhakal', '2024-06-18 17:37:25'),
(33, 282766, 'aakashdhakal', '2024-06-18 17:38:56'),
(34, 616753, 'aakashdhakal', '2024-06-18 17:39:27'),
(35, 180361, 'pukarrimal', '2024-06-18 17:41:04'),
(36, 862062, 'pukarrimal', '2024-06-19 01:25:50'),
(37, 422477, 'iamcrocmaster', '2024-06-19 01:26:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favourite_songs`
--
ALTER TABLE `favourite_songs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `musics`
--
ALTER TABLE `musics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `music_history`
--
ALTER TABLE `music_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_music_id` (`music_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_playlist_id` (`playlist_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `verify_email`
--
ALTER TABLE `verify_email`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favourite_songs`
--
ALTER TABLE `favourite_songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `musics`
--
ALTER TABLE `musics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `music_history`
--
ALTER TABLE `music_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `verify_email`
--
ALTER TABLE `verify_email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `music_history`
--
ALTER TABLE `music_history`
  ADD CONSTRAINT `fk_music_id` FOREIGN KEY (`music_id`) REFERENCES `musics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD CONSTRAINT `fk_playlist_id` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
