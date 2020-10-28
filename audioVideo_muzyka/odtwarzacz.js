const media = document.querySelector('video');
media.style.visibility = 'hidden';

const kontrolki = document.querySelector('.controlGear');
kontrolki.style.visibility = 'visible';

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const przod = document.querySelector('.przod');
const wstecz = document.querySelector('.wstecz');

const timerWrapper = document.querySelector('.timer');
const timeBar = document.querySelector('.timer div');
const licznikCzasu = document.querySelector('.timer span');

let intervalPrzod;
let intervalWstecz;


play.addEventListener('click', grajPausuj);
function grajPausuj() {
    przod.classList.remove('active');
    wstecz.classList.remove('active');
    clearInterval(intervalPrzod);
    clearInterval(intervalWstecz);

    if (media.paused){
        play.setAttribute('data-icon', 'u');
        media.play();
    } else {
        play.setAttribute('data-icon', 'P');
        media.pause();
    }
}

stop.addEventListener('click', zatrzymajUtwor);
media.addEventListener('ended', zatrzymajUtwor);
function zatrzymajUtwor() {
    media.pause();
    media.currentTime = 0;
    play.setAttribute('data-icon', 'P');

    przod.classList.remove('active');
    wstecz.classList.remove('active');
    clearInterval(intervalPrzod);
    clearInterval(intervalWstecz);
}

przod.addEventListener('click', przesuwanie);
wstecz.addEventListener('click', cofanie);

function przesuwanie() {
    clearInterval(intervalWstecz);
    wstecz.removeAttribute('active');

    if (przod.classList.contains('active')){
        przod.classList.remove('active');
        clearInterval(intervalWstecz);
        media.play();
    } else {
        przod.classList.add('active');
        media.pause();
        intervalPrzod = setInterval(windFrd, 200);
    }
}

function cofanie() {
    clearInterval(intervalPrzod);
    przod.removeAttribute('active');

    if(wstecz.classList.contains('active')){
        wstecz.classList.remove('active');
        clearInterval(intervalPrzod);
        media.play();
    } else {
        wstecz.classList.add('active');
        media.pause();
        intervalWstecz = setInterval(windBack, 200);
    }
}

function windFrd() {
    if (media.currentTime >= media.duration -3){
        przod.classList.remove('active');
        clearInterval(intervalPrzod);
        zatrzymajUtwor();
    } else {
        media.currentTime += 3;
    }
}

function windBack() {
    if (media.currentTime <3) {
        wstecz.classList.remove('active');
        clearInterval(intervalWstecz);
        zatrzymajUtwor();
    } else {
        media.currentTime -=3;
    }
}

media.addEventListener('timeupdate', wyswietlaczCzasu);
function wyswietlaczCzasu() {
    let minuty = Math.floor( media.currentTime / 60);
    let sekundy = Math.floor(media.currentTime - minuty * 60);

    let minutyVal;
    let sekundyVal;

    if (sekundy<10){
        sekundyVal = '0'+sekundy;
    } else {
        sekundyVal = sekundy;
    }

    if (minuty<10){
        minutyVal = '0'+minuty;
    } else {
        minutyVal = minuty;
    }

    let czas = minutyVal +':' + sekundyVal;
    licznikCzasu.textContent = czas;

    let dlugoscPaskaCzasu = timerWrapper.clientWidth * (media.currentTime / media.duration);
    timeBar.style.width = dlugoscPaskaCzasu + 'px';
}

timerWrapper.addEventListener('click', function (ev) {
    let rect = timerWrapper.getBoundingClientRect();
    let dlugoscBoku = rect['x'];
    let pozycjaMyszki = ev.clientX;

    let nowyStartGraficzny = pozycjaMyszki - dlugoscBoku;
    media.pause();

    media.currentTime = nowyStartGraficzny* media.duration / timerWrapper.clientWidth;
    media.play();
});

