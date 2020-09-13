
const section = document.querySelector('section');
const header = document.querySelector('header');
const guzik = document.querySelector('.guzik');
const obr = document.querySelector('.obrazek');

let requestURL = "http://api.nbp.pl/api/exchangerates/tables/a/?format=json";
let request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

// to poniżej to że się pojawia od razu na stronie
// request.onload = function () {
//     const calosc = request.response;
//
//     naglowek(calosc);
//     reszta(calosc);
// }


// tu poniżej, to jak się naciśnie guzik
guzik.onclick = function (){
    const calosc = request.response;

    naglowek(calosc);
    reszta(calosc);
}

// tu poniżej, to jak się najedzie myszką

obr.addEventListener("mouseover", function (){
    const calosc = request.response;

    naglowek(calosc);
    reszta(calosc);
} );


function naglowek (jsonObj) {
    const myH1 = document.createElement('h1');
    myH1.textContent ='Data: ' + jsonObj[0]['effectiveDate'];
    header.appendChild(myH1);
}

function reszta(jsonObj) {

    let rates = jsonObj[0]['rates'];

    for (let i=0; i<rates.length; i++) {
        let komorka = document.createElement('article');
        let myH2 = document.createElement('h2');
        let myList = document.createElement('ul');

        let cur = document.createElement('li');
        let cod = document.createElement('li');
        let mid = document.createElement('li');

        myH2.textContent = i;

        cur.textContent = "Waluta: "+ rates[i]['currency'];
        cod.textContent = "Kod: "+ rates[i]['code'];
        mid.textContent = "Kurs średni: "+ rates[i]['mid'];

        myList.appendChild(cur);
        myList.appendChild(cod);
        myList.appendChild(mid);

        komorka.appendChild(myH2);
        komorka.appendChild(myList);

        section.appendChild(komorka);
    }
}

