import playList from '../../assets/json/playList.js';

const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');
const playListOut = document.querySelector('.play-list');
const trackNameOut = document.querySelector('.player-name');
const trackTimeOut = document.querySelector('.player-time');
const trackTotalTimeOut = document.querySelector('.player-total-time');

// .player-duration {
// }
// .player-progress {
// }

let trackNumber = 0;
const audio = new Audio();

let isPlay = false;

function generationPlaylist() {
    let playListElem = playList.reduce((acum, item) => {
        acum += `<li class="play-item">${item.title}</li>`;
        return acum;
    }, ``);

    playListOut.innerHTML = playListElem;
}

function trackActive(num) {
    const trackItems = document.querySelectorAll('.play-item');
    trackItems.forEach((item) => item.classList.remove('item-active'));
    trackItems[num].classList.add('item-active');
}

function playAudio(num) {
    audio.src = playList[num].src;
    audio.currentTime = 0;

    if (!isPlay) {
        audio.play();
        isPlay = true;
        trackActive(num);
    } else {
        audio.pause();
        isPlay = false;
    }
}

function playPrev() {
    if (isPlay) {
        audio.pause();
        isPlay = false;
        playBtn.classList.remove('pause');
    }
    if (trackNumber === 0) {
        trackNumber = playList.length - 1;
        trackActive(trackNumber);
    } else {
        trackNumber -= 1;
        trackActive(trackNumber);
    }
    playAudio(trackNumber);
    playBtn.classList.add('pause');
}

function playNext() {
    if (isPlay) {
        audio.pause();
        isPlay = false;
        playBtn.classList.remove('pause');
    }
    if (trackNumber === playList.length - 1) {
        trackNumber = 0;
        trackActive(trackNumber);
    } else {
        trackNumber += 1;
        trackActive(trackNumber);
    }
    playAudio(trackNumber);
    playBtn.classList.add('pause');
}

function toggleBtn() {
    playBtn.classList.toggle('pause');
}

generationPlaylist();

playBtn.addEventListener('click', () => {
    playAudio(trackNumber);
    toggleBtn();
});

prevBtn.addEventListener('click', playPrev);

nextBtn.addEventListener('click', playNext);

audio.addEventListener('ended', () => {
    playNext();
    playAudio(trackNumber);
    playBtn.classList.add('pause');
});
