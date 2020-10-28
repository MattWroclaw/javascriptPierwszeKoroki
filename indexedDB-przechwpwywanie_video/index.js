window.onload = function () {
    const section = document.querySelector('section');
    const videos = [
        {'name': 'crystal'},
        {'name': 'elf'},
        {'name': 'frog'},
        {'name': 'monster'},
        {'name': 'pig'},
        {'name': 'rabbit'}
    ];

//    instancja do prechowywania db
    let db;

    function init() {
        // iterowanie przez wszystkie video name
        for (let i = 0; i < videos.length; i++) {
            //    otwórz transakcje,
            let objectStore = db.transaction('v-ideos').objectStore('v-ideos');
            // weź całą tabelę v-ideos, ale nas interesuje tylko name każdego z obiektów
            // to name mamy za-hardcode-owane w const videos
            let request = objectStore.get(videos[i].name);

            request.onsuccess = function () {
                // jeśli coś jest w bazie (nie undefined)
                if (request.result) {
                    // bierz video z BD i wyświetl je za pomocą displayVideo
                    console.log('Pobieram video z BD');
                    displayVideo(request.result.mp4,
                        request.result.webm,
                        request.result.name);
                } else {
                    // zaciągnij z sieci
                    fetchVideoFromNetwork(videos[i]);
                }
            }
        }
        console.log('Funcja init - za pętla');
    }


    function fetchVideoFromNetwork(video) {
        console.log('Pobieram video z sieci');

        // Pobierz MP4 oraz Webm za pomocą fetch()

        let mp4Blob = fetch('https://raw.githubusercontent.com/mdn/learning-area/master/javascript/apis/client-side-storage/indexeddb/video-store/videos/'+video.name+'.webm')
            .then(response => response.blob());

        let webBlob = fetch('https://raw.githubusercontent.com/mdn/learning-area/master/javascript/apis/client-side-storage/indexeddb/video-store/videos/' + video.name + '.webm')
            .then(response => response.blob());


        // uruchom tylko wtedy gdy 2 promisses są spełnione
        Promise.all([mp4Blob, webBlob])
            .then(function (values) {
                // wyswietl filmik za pomocą displayVideo()
                displayVideo(values[0], values[1], video.name);

                //przechowaj je w IDB za pomocą storeVideo
                storeVideo(values[0], values[1], video.name);
            });
    }

    function storeVideo(mp4Blob, webmBlob, name) {

        let objectStore = db.transaction(['v-ideos'], 'readwrite').objectStore('v-ideos');
        // tworzenie rekordu w IDB
        let record = {
            mp4: mp4Blob,
            webm: webmBlob,
            name: name
        }
        // dodajemy do IDB
        let request = objectStore.add(record);

        request.onsuccess = function () {
            console.log("Record addition attempt finished");
        }

        request.onerror = function () {
            console.log(request.error);
        }
    };

    function displayVideo(mp4Blob, webmBlob, title) {
        //    stwórz URLe obiektów z danych blobów
        let mp4URL = URL.createObjectURL(mp4Blob);
        let webmURL = URL.createObjectURL(webmBlob);

        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        h2.textContent = title;

        const video = document.createElement('video');
        video.controls = true;

        const source1 = document.createElement('source');
        source1.src = mp4URL;
        source1.type = 'video/mp4';
        const source2 = document.createElement('source');
        source2.type = 'video/webm';
        source2.src = webmURL;

        section.appendChild(article);
        article.appendChild(h2);
        article.appendChild(video);
        video.appendChild(source1);
        video.appendChild(source2);
    }

    // otwórz naszą IBD, jest ona tworzona o ile już  nie istnieje --> patrz onupgradeneeded
    let request = window.indexedDB.open('v-ideos', 1);

    request.onsuccess = function () {
        console.log("Otwarcie BD");
        db = request.result;
        init();
    };
    request.onerror = function () {
        console.log("Baza danch się nie otworzyła");
    };

    //     tworzenie tabel BD o ile nie było to już stworzone
    // set up dla bazy danch
    request.onupgradeneeded = function (ev) {
        let db = ev.target.result;

        // towrzenie tabeli z auto-icnrementacja
        let objectStore = db.createObjectStore('v-ideos', {keyPath: 'name'});

        // definiowanie jakie typy obiektów beda przechowywane
        objectStore.createIndex('mp4', 'mp4', {unique: false});
        objectStore.createIndex('webm', 'webm', {unique: false});

        console.log('DB setup complete');
    };

    // rejestracja service Workera do kontroli offline


}