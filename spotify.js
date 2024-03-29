//getting elements
let audioElement = new Audio('../songs/4.mp3')
console.log('welcome to spotify')
// audioElement.play();

songPlay = document.getElementsByClassName('song-play-button');


//CREATING SONG ARRAY
let songs = [
    {
        songName: "Seven, Jungkook (Single Debut Song)",
        filePath: "../songs/1.mp3",
        coverPath: "../albums/1.jpeg",
        songTime: "03:46"
    },
    {
        songName: "Popular, The Weeknd",
        filePath: "../songs/2.mp3",
        coverPath: "../albums/2.jpeg",
        songTime: "03:35"
    },
    {
        songName: "Strawberry & Cigarettes, Troy Sivan",
        filePath: "../songs/3.mp3",
        coverPath: "../albums/3.jpeg",
        songTime: "03:21"
    },
    {
        songName: "Fake Love, BTS",
        filePath: "../songs/4.mp3",
        coverPath: "../albums/4.jpeg",
        songTime: "05:18"
    },
    {
        songName: "Deja Vu, Olivia Rodrigo",
        filePath: "../songs/5.mp3",
        coverPath: "../albums/5.jpeg",
        songTime: "03:51"
    },
    {
        songName: "Butter, BTS",
        filePath: "../songs/6.mp3",
        coverPath: "../albums/6.jpeg",
        songTime: "03:02"
    },
    {
        songName: "good4u, Olivia Rodrigo",
        filePath: "../songs/7.mp3",
        coverPath: "../albums/7.jpeg",
        songTime: "03:18"
    },
    {
        songName: "Dynamite, BTS",
        filePath: "../songs/8.mp3",
        coverPath: "../albums/8.jpeg",
        songTime: "03:21"
    },
    {
        songName: "Mic Drop, BTS (feat Steve Aoki)",
        filePath: "../songs/9.mp3",
        coverPath: "../albums/9.jpeg",
        songTime: "04:34"
    }
]

let songIndex = 0;

let playSong = document.getElementById('play');
let progressBar = document.getElementById('rangebar');

let musicGIF = document.getElementById('gif');

playSong.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()

        //ALSO I WANT PLAY TO CHANGE TO PAUSE
        playSong.classList.remove('fa-circle-play');
        playSong.classList.add('fa-circle-pause');
        songPlay[songIndex - 1].classList.remove('fa-play');
        songPlay[songIndex - 1].classList.add('fa-pause');
        musicGIF.style.opacity = 1;
    }
    else {
        audioElement.pause()

        //ALSO I WANT PAUSE TO CHANGE TO PLAY
        playSong.classList.remove('fa-circle-pause');
        playSong.classList.add('fa-circle-play');

        songPlay[songIndex - 1].classList.add('fa-play');
        songPlay[songIndex - 1].classList.remove('fa-pause');

        //it must stop now
        musicGIF.style.opacity = 0;
    }
});


//UPDATING TIME ON PROGRESS BAR
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
})

//ON CLICKING ANYWHERE ON PROGRESS BAR THE AUDIO SHOULD MATCH THE TIME
progressBar.addEventListener('click', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100
})

//GETTING SONG NAME AND ITS COVER N ITS DURATION IN HTML
let songDetails = Array.from(document.getElementsByClassName('songs'));
songDetails.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('song-name')[0].innerText = songs[i].songName;
    element.getElementsByClassName('song-duration')[0].innerText = songs[i].songTime;
})


//FOR PLAYING THAT PARTICULAR SONG WHEN CLICKED ON ITS PLAY BUTTON
const playAll = () => {
    Array.from(document.getElementsByClassName('song-play-button')).forEach((element) => {

        element.classList.remove('fa-pause');
        element.classList.add('fa-play');

    })
}
const changeColor = () => {
    Array.from(document.getElementsByClassName('song-name')).forEach((element) => {

        element.style.color = '#ffffff';

    })
}

currentSongName = document.getElementById('curr-song');
currentSongCover = document.getElementById('curr-cover');

currentSongPlaying = document.getElementsByClassName('song-name');

Array.from(document.getElementsByClassName('song-play-button')).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e);
        // console.log(e.target);


        //PAUSE SONG IF ALREADY PLAYING
        if (e.target.classList.contains('fa-pause')) {
            // playAll();
            songIndex = parseInt(e.target.id);
            e.target.classList.add('fa-play');
            e.target.classList.remove('fa-pause');

            // audioElement.src = `../songs/${songIndex}.mp3`;
            // audioElement.currentTime = 0;
            audioElement.pause();
            musicGIF.style.opacity = 0;
            playSong.classList.add('fa-circle-play');
            playSong.classList.remove('fa-circle-pause');
            currentSongPlaying[songIndex - 1].style.color = '#ffffff';
        }

        //RESUME SONG IF NOT PLAYING
        else {
            playAll();
            changeColor();
            songIndex = parseInt(e.target.id);

            currentSongName.innerText = songs[songIndex - 1].songName;
            currentSongCover.src = songs[songIndex - 1].coverPath;
            
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            
            audioElement.src = `../songs/${songIndex}.mp3`;
            audioElement.play();

            // audioElement.currentTime = progressBar.value*2.8;
            // audioElement.currentTime = 0;
            musicGIF.style.opacity = 1;

            playSong.classList.remove('fa-circle-play');
            playSong.classList.add('fa-circle-pause');

            currentSongPlaying[songIndex - 1].style.color = '#1ed760';

            // console.log(currentSongName);
            // console.log(currentSongCover);



        }

        // else if(playSong.classList.contains('fa-circle-play')){
        //     e.target.classList.add('fa-play');
        //     e.target.classList.remove('fa-pause');
        //     audioElement.pause();
        // musicGIF.style.opacity = 0;
        // }



    })

})




//ADDING EVNETS FOR PREVIOUS AND NEXT SONG
previousSong = document.getElementById('previous');
nextSong = document.getElementById('next');
previousSong.addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = 9;
    }
    else {
        songIndex = songIndex - 1;
    }

    audioElement.src = `../songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    musicGIF.style.opacity = 1;
    playAll();

    changeColor();
    currentSongName.innerText = songs[songIndex - 1].songName;
    currentSongCover.src = songs[songIndex - 1].coverPath;
    currentSongPlaying[songIndex - 1].style.color = '#1ed760';
    playSong.classList.remove('fa-circle-play');
    playSong.classList.add('fa-circle-pause');

    songPlay[songIndex - 1].classList.remove('fa-play');
    songPlay[songIndex - 1].classList.add('fa-pause');

})
nextSong.addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 1;
    }
    else {
        songIndex = songIndex + 1;
    }
    audioElement.src = `../songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    musicGIF.style.opacity = 1;
    playAll();

    changeColor();
    currentSongName.innerText = songs[songIndex - 1].songName;
    currentSongCover.src = songs[songIndex - 1].coverPath;
    currentSongPlaying[songIndex - 1].style.color = '#1ed760';
    playSong.classList.remove('fa-circle-play');
    playSong.classList.add('fa-circle-pause');
    songPlay[songIndex - 1].classList.remove('fa-play');
    songPlay[songIndex - 1].classList.add('fa-pause');
})