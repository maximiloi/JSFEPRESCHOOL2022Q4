import playList from '../../assets/json/playList.js';

const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');
const volumeBtn = document.querySelector('.volume');
const playListOut = document.querySelector('.play-list');
const trackNameOut = document.querySelector('.player-name');
const trackTimeOut = document.querySelector('.player-current-time');
const trackTotalTimeOut = document.querySelector('.player-total-time');
const durationSlider = document.querySelector('.player-duration');
const volumeSlider = document.querySelector('.player-volume');

const audio = new Audio();

let trackNumber = 0;
let isPlay = false;
let muteState = 'unmute';

export function generationPlaylist() {
    const playListElem = playList.reduce((acum, item) => {
        acum += `<li class="play-item">${item.title}</li>`;
        return acum;
    }, ``);

    playListOut.innerHTML = playListElem;
}

function calculateTime(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

function displayDuration() {
    trackTotalTimeOut.textContent = calculateTime(audio.duration);
}

function setSliderMax() {
    durationSlider.max = Math.floor(audio.duration);
}

function trackActive(num) {
    const trackItems = document.querySelectorAll('.play-item');
    trackItems.forEach((item) => item.classList.remove('item-active'));
    trackItems[num].classList.add('item-active');
    trackNameOut.textContent = trackItems[num].textContent;
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

function toggleBtn(btnName, className) {
    btnName.classList.toggle(className);
}

function volumeMute() {
    if (muteState === 'unmute') {
        audio.muted = true;
        muteState = 'mute';
    } else {
        audio.muted = false;
        muteState = 'unmute';
    }
}

if (audio.readyState > 0) {
    displayDuration();
    setSliderMax();
} else {
    audio.addEventListener('loadedmetadata', () => {
        displayDuration();
        setSliderMax();
    });
}

playBtn.addEventListener('click', () => {
    toggleBtn(playBtn, 'pause');
    playAudio(trackNumber);
});

prevBtn.addEventListener('click', playPrev);

nextBtn.addEventListener('click', playNext);

volumeBtn.addEventListener('click', () => {
    toggleBtn(volumeBtn, 'mute');
    volumeMute();
});

audio.addEventListener('ended', () => {
    playNext();
    playBtn.classList.add('pause');
});

audio.addEventListener('timeupdate', () => {
    durationSlider.value = Math.floor(audio.currentTime);
    trackTimeOut.textContent = calculateTime(durationSlider.value);
});

volumeSlider.addEventListener('input', (e) => {
    // Управления громкостью
    const value = e.target.value;
    audio.volume = value / 100;
});

durationSlider.addEventListener('input', () => {
    trackTimeOut.textContent = calculateTime(durationSlider.value);
});

durationSlider.addEventListener('change', () => {
    audio.currentTime = durationSlider.value;
});
