const media = document.querySelector('video');
const controls = document.querySelector('.controls');

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

const timerWrapper = document.querySelector('.timer');
const timer =document.querySelector('.timer span');
const timerBAr = document.querySelector('.timer div');

media.removeAttribute('controls'); // usuwa domyslne controls
controls.style.visibility = 'visible'; // widoczne sa nasze kontrolki

play.addEventListener('click', playPauseMedia);


function playPauseMedia() {

    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    clearInterval(intervalRwd);

    if (media.paused){
        play.setAttribute('data-icon', 'u');
        media.play();
    } else {
        play.setAttribute('data-icon', 'P');
        media.pause();
    }
}

stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia); // to jest po do że jak się filmik skończy, żeby go zatrzymać

function stopMedia() {
    //poieważ w HTMKMedia nie ma STOP trzeba zrobić pause + time=0
    media.pause();
    media.currentTime = 0;
    play.setAttribute('data-icon', 'P');

    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    clearInterval(intervalRwd);
}

rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

let intervalFwd;
let intervalRwd;

function mediaBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove('active');

    if (rwd.classList.contains('active')){ //classList istnieje na kazdym elemencie. Zawiera listę wszystkich klas danego elementu oraz metod. Sprawdzamy czy lista zawiera klasę active
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        media.play();
    } else {
        rwd.classList.add('active');
        media.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
    play.setAttribute('data-icon', 'P');
}

function mediaForward (){
    clearInterval(intervalRwd);
    rwd.classList.remove('active');

    if (fwd.classList.contains('active')) {
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        media.play();
    } else {
        fwd.classList.add('active');
        media.pause();
        intervalFwd = setInterval(windForward, 200);
    }

    play.setAttribute('data-icon', 'P');
}

function windBackward() {
    if (media.currentTime <= 3) {
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        stopMedia();
    } else {
        media.currentTime -= 3;
    }
}

function windForward() {
    if(media.currentTime >= media.duration -3){
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        stopMedia();
    } else {
        media.currentTime += 3;
    }
}


media.addEventListener('timeupdate', setTime);

function setTime() {
    let minutes  = Math.floor(media.currentTime / 60);
    let seconds = Math.floor(media.currentTime - minutes*60);

    let minuteValue;
    let secondValue;

    if(minutes < 10){
        minuteValue = '0' + minutes;
    } else {
        minuteValue = minutes;
    }

    if (seconds < 10) {
        secondValue = '0' + seconds;
    } else {
        secondValue  = seconds;
    }

    let mediaTime = minuteValue +':'+ secondValue;
    timer.textContent = mediaTime;

    let barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBAr.style.width = barLength +'px';
}

timerWrapper.addEventListener('click', przesuwanie);
const punkt = document.querySelector('.point');

function przesuwanie(ev) {

    let rect = timerWrapper.getBoundingClientRect();
    let bliskiBok = rect["x"];
    let x = ev.clientX;

    let nowyStart = (x - bliskiBok);
    media.pause();
    media.currentTime = nowyStart * media.duration / timerWrapper.clientWidth;
    media.play();


// test
    let cz = document.createElement('li');
    cz.textContent = nowyStart;
    punkt.appendChild(cz);
}

