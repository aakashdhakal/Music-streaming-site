<section id="uploadMusic">
    <form action="" id="uploadMusicForm">
        <div class="uploads-container">
            <div class="music-upload-area">
                <p class="music-upload-text">
                    <iconify-icon icon="bytesize:upload"></iconify-icon>
                    Drag and drop your music file here
                    <span>or</span>
                </p>
                <div class="custom-file-upload">
                    <input type="file" id="musicFile" name="musicFile" accept="audio/*" required>
                    <label for="musicFile">
                        Browse Files
                    </label>
                </div>
            </div>
            <div class="image-upload-area">
                <p>Song Cover: </p>
                <div class="custom-image-upload" style="background-image: url('/public/images/song-cover/music.jpg');">
                    <input type="file" id="coverImage" name="coverImage" class="image-upload" accept="image/*" required>
                    <label for="coverImage ">
                        Browse Files
                    </label>
                </div>
            </div>
            <div class="lyrics-upload-area">
                <p>Lyrics: </p>
                <div class="custom-file-upload">
                    <input type="file" id="lyricsFile" name="lyricsFile" accept=".lrc" required>
                    <label for="lyricsFile" class="music-upload-text">
                        Browse Files
                    </label>
                </div>
            </div>
        </div>
        <div class="details-container">
            <div class="form-group">
                <input type="text" id="title" name="title" placeholder="">
                <label for="title">Title</label>
            </div>
            <div class="form-group">
                <textarea type="text" id="description" name="description" placeholder=" " rows="5"></textarea>
                <label for="description">Description</label>
            </div>
            <div class="form-group">
                <div class="custom-select">
                    
                </div>
            </div>

    </form>

</section>