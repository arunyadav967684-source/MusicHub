```javascript
// ======================================
// MUSIC WEBSITE JAVASCRIPT
// ======================================


// ======================================
// SONG LIST
// ======================================

const songs = [
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        image: "images/song1.jpg",
        file: "music/perfect.mp3"
    },

    {
        title: "Believer",
        artist: "Imagine Dragons",
        image: "images/song2.jpg",
        file: "music/believer.mp3"
    },

    {
        title: "Faded",
        artist: "Alan Walker",
        image: "images/song3.jpg",
        file: "music/faded.mp3"
    },

    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        image: "images/song4.jpg",
        file: "music/shapeofyou.mp3"
    }
];


// ======================================
// VARIABLES
// ======================================

const audioPlayer = document.getElementById("audioPlayer");

const playButton = document.getElementById("playButton");

const currentTitle = document.getElementById("currentTitle");

const currentArtist = document.getElementById("currentArtist");

const volumeControl = document.getElementById("volumeControl");

const currentImage = document.querySelector(".current-song img");

const searchInput = document.querySelector(".search input");

let currentSongIndex = 0;


// ======================================
// LOAD SONG
// ======================================

function loadSong(index) {

    if (index < 0) {
        index = songs.length - 1;
    }

    if (index >= songs.length) {
        index = 0;
    }

    currentSongIndex = index;

    const song = songs[currentSongIndex];

    audioPlayer.src = song.file;

    currentTitle.textContent = song.title;

    currentArtist.textContent = song.artist;

    currentImage.src = song.image;

    // Change browser title
    document.title = song.title + " - MusicHub";
}


// ======================================
// PLAY SONG
// ======================================

function playSong(file) {

    const songIndex = songs.findIndex(
        song => song.file === file
    );

    if (songIndex !== -1) {

        loadSong(songIndex);

        audioPlayer.play()
            .then(() => {
                playButton.textContent = "⏸";
            })
            .catch(error => {
                console.log("Unable to play song:", error);
            });
    }
}


// ======================================
// PLAY / PAUSE
// ======================================

function togglePlay() {

    if (!audioPlayer.src) {

        loadSong(0);

        audioPlayer.play();

        playButton.textContent = "⏸";

        return;
    }

    if (audioPlayer.paused) {

        audioPlayer.play();

        playButton.textContent = "⏸";

    } else {

        audioPlayer.pause();

        playButton.textContent = "▶";
    }
}


// ======================================
// NEXT SONG
// ======================================

function nextSong() {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

    audioPlayer.play();

    playButton.textContent = "⏸";
}


// ======================================
// PREVIOUS SONG
// ======================================

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);

    audioPlayer.play();

    playButton.textContent = "⏸";
}


// ======================================
// VOLUME CONTROL
// ======================================

volumeControl.addEventListener("input", function () {

    audioPlayer.volume = this.value;

});


// Set default volume
audioPlayer.volume = 1;


// ======================================
// SONG FINISHED
// ======================================

audioPlayer.addEventListener("ended", function () {

    nextSong();

});


// ======================================
// UPDATE PLAY BUTTON
// ======================================

audioPlayer.addEventListener("play", function () {

    playButton.textContent = "⏸";

});


audioPlayer.addEventListener("pause", function () {

    playButton.textContent = "▶";

});


// ======================================
// SEARCH SONGS
// ======================================

searchInput.addEventListener("input", function () {

    const searchText = this.value.toLowerCase().trim();

    const songCards = document.querySelectorAll(".song-card");

    songCards.forEach((card, index) => {

        const song = songs[index];

        if (!song) {
            return;
        }

        const title = song.title.toLowerCase();

        const artist = song.artist.toLowerCase();

        if (
            title.includes(searchText) ||
            artist.includes(searchText)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// ======================================
// LOAD FIRST SONG
// ======================================

loadSong(0);
```
