<dialog id="createNewPlaylistDialog">
    <button class="close-dialog-btn"> <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="max-width">
        <h2>Create New Playlist</h2>
        <form action="" method="POST" class="create-playlist-form" enctype="multipart/form-data" id="createPlaylist">
            <div class="form-group playlist-name">
                <input type="text" name="playlist-name" id="playlist-name" placeholder="" required>
                <label for="playlist-name">Playlist Name </label>
            </div>
            <div class="form-group playlist-description">
                <input type="text" name="playlist-description" id="playlist-description" placeholder="">
                <label for="playlist-description">Description</label>
            </div>
            <div class="custom-file-upload">
                <input type="file" id="playlistCover" class="file-upload" name="playlist_cover" hidden />
                <label for="playlistCover">Upload Cover</label>
                <img src="<?php echo $baseUrl ?>\public\images\playlist-cover\playlist-cover.png" alt=""
                    class="preview-image">
            </div>
            <button type="submit" class="create-playlist-btn">Create Playlist</button>
        </form>
    </div>
</dialog>