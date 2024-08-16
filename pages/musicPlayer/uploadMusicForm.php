<dialog id="uploadMusicDialog">
    <button class="close-dialog-btn"> <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="max-width">
        <h2>Upload Music</h2>
        <form method="post" enctype="multipart/form-data" id="uploadMusicForm">
            <div class="form-group">
                <input type="text" name="song-name" placeholder="" id="song-name" required>
                <label for="song-name">Song Name</label>
            </div>
            <!-- <div class="form-group">
            <input type="text" name="album-name" placeholder="" required>
            <label for="album-name">Album Name</label>
        </div> -->
            <div class="form-group">
                <input type="text" name="genre" placeholder="" id="genre" required>
                <label for="genre">Genre</label>
            </div>
            <div class="drag-drop-area">
                <div class="drag-drop-text">
                    <i class="fa-solid fa-upload"></i>
                    <p>Drag and drop your music here</p>
                </div>
                <input type="file" id="songInput" name="song" hidden />
                <label for="songInput">Browse Files</label>
            </div>

            <div class="custom-file-upload">
                <input type="file" class="file-upload" id="songCover" name="song_cover" hidden />
                <label for="songCover">Choose Song Cover</label>
                <img src="\WEB-PROJECT\public\images\song-cover/music.jpg" alt="" class="preview-image">
            </div>
            <button type="submit" class="primary-btn upload-music-btn">Upload Music</button>

        </form>
    </div>
</dialog>