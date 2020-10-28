const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

// obiekt do przechowywania BD
let db;

// zabaezpieczenie przed tym, żeby nie używać db  przed załadowaniem się całej aplikacji
window.onload = function () {
    //tworzymy requesta zeby otworzyc ver1. ktora nazywa sie notes_db
    // towrzenie db zabiera czas, wiec jest asynchroniczne - nie
    // robi sie natychmiast
    let request = window.indexedDB.open('notes_db', 1);
    //na wypadek, gdy db nie otworzy sie poprawnie
    request.onerror = function () {
        console.log('DataBase failed to open');
    }
    // gdy wszystko jest OK (taki handler)
    request.onsuccess = function () {
        console.log('DB opened successfully');
        //obiekt do przechowywania obtwartej DB
        db = request.result;
        // uruchom funkcję displayData() żeby wyświetlić notatki
        displayData();
    }

// jeśli jeszcze to nie było zrobione ustaw tabele
// tutaj definiujemy schema (strukture) DB
    request.onupgradeneeded = function (ev) {
        // bierzemy referencje do OTWARTEJ BD
        let db = ev.target.result; // == request.result; <---  ale tak nie możemy zrobić, bo zmienna db nie będzie jeszcze dostęna kiedy onupgradeneeded sie uruchomi (czyli przed onsuccess)

        // w objectStore będziemy przechowywać notatki (to jakby poj. tabela)
        // wraz z autoincrement key =id, name = notes_os,
        let objectStore = db.createObjectStore('notes_os', {keyPath: "id", autoIncrement: true});

        //definiujemy jaki typ obiektów będzie przechowywał objectStore. to są jakby pola
        objectStore.createIndex('title', 'title', {unique: false});
        objectStore.createIndex('body', 'body', {unique: false});

        console.log('Koniec ustawiania bazy danych. BD ustaiona');
    }

// kiedy formularz jest wypełniony, towrzymy handler onSubmit
    form.onsubmit = addData;

    function addData(e) {
        //    zapobiegamy działaniu konwencjonalnemu działaniu funkcji submit obiektu form
        e.preventDefault();

        //to jest konstruktor obiektu, który będzie przechowywał wpis z formularza
        let newItem = {
            title: titleInput.value,
            body: bodyInput.value
        }; // nie trzeba podawać jawnie id

        // otwieramy transakcję read/write, żeby dostarczyć dane
        let transaction = db.transaction(['notes_os'], 'readwrite'); // mamy dostęp do obiektu, więc możemy go np dodać do bazy

        // bierzemy obiekt, ktory ma być zapisany
        let objectStore = transaction.objectStore('notes_os');

        // towrzymy requesta aby dodać nasz newItem
        let request = objectStore.add(newItem);

        request.onsuccess = function () {
            // przeczyścić formularz
            titleInput.value = '';
            bodyInput.value = '';
        };

        // Gdy wszystko jest OK, info na konsoli
        transaction.oncomplete = function () {
            console.log('Transakcja zakończona, BD zmodyfikowana');

            //jeszcze raz wyświetlamy zawartość DB
            displayData();
        };

        transaction.error = function () {
            console.log('Transakcja nie otwarta - error');
        };
    }

    function displayData() {
        // trzeba ususnąć zawartość listy przed każdym użyciem displayData
        // w innym razie będą się one sumować
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        // otwieramy objectStore, przechwytujemy kursor, który iteruje
        // przez wszystkie dane w pamięci
        let objecStore = db.transaction('notes_os')
            .objectStore('notes_os');

        // ta funkcja pozwoli na iterowanie po rekordach tabeli
        // tutaj wykorzystujemy event handerer
        //when the cursor is successfully returned, the handler is run.
        objecStore.openCursor().onsuccess = function (ev) {
            //referencja do kursora
            let cursor = ev.target.result;

            //jeśli są dane do przeiterowania ...
            if (cursor) {
                const listItem = document.createElement('li');
                const h3 = document.createElement('h3');
                const para = document.createElement('p');

                listItem.appendChild(h3);
                listItem.appendChild(para);
                list.appendChild(listItem);

                h3.textContent = cursor.value.title;
                para.textContent = cursor.value.body;

                //*****************************************************
                //przechowaj ID wewnatrz atrybutu listItem,
                // przyda sie przy kasowaniu listItem
                listItem.setAttribute('data-note-id', cursor.value.id);
                //*****************************************************

                //guzik Delete
                const deleteBtn = document.createElement('button');
                listItem.appendChild(deleteBtn);
                deleteBtn.textContent = 'Usun';
                deleteBtn.onclick = deleteItem;

                // przejdź dalej do następnego rekordu i uruchom blok if od nowa
                // czyli po prostu robi petle
                cursor.continue();

                // jak już nie  będzie innego obietu do przeitereowania
                // kursor zmieni sie w Undefined i wtedy załączny się blok else
            } else {
                // jak baza jest pusta, to info dla usera
                if(!list.firstChild){
                    const listItem = document.createElement('li');
                    listItem.textContent = 'Nie ma żadnych notatek';
                    list.appendChild(listItem);
                }
                console.log('Wszystko zostało pokazane');
            }
        };
    }

    function deleteItem(ev) {
        // uzyskaj nazwe notatki do usuniecia.
        //Potrzeba uzykać Id - jest on przechowywane w atrybucie data-note-id
        // potrzeba przekonwertowac na string Id liczbe Number
        // IDB kyes sa type-sesitive
        let noteId = Number(ev.target.parentNode.getAttribute('datanote-id'));

        //otwieramy db i szukamy notatki po id, kasujemy
        let transaction = db.transaction(['notes_os'], 'readwrite');
        let objectStore = transaction.objectStore('notes_os');
        let request = objectStore.delete(noteId);


        //tworzymy raport
        transaction.oncomplete = function(){
            ev.target.parentNode.parentNode.removeChild(ev.target.parentNode);
            console.log('Note '+noteId+' removed');

            // jeżeli zaś lista jest pusta, to info dla usera
            if(!list.firstChild){
                let listItem = document.createElement('li');
                listItem.textContent = 'Nie ma niczego w bazie';
                list.appendChild(listItem);
            }
        };

    }

}
