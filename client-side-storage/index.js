const rememberDiv = document.querySelector('.remember');
const forgetDiv = document.querySelector('.forget');
const form = document.querySelector('form');
const nameInput = document.querySelector('#entername');
const submitBtn = document.querySelector('#submitname');
const forgetBtn = document.querySelector('#forgetname');

const h1 = document.querySelector('h1')
const personalGreeting = document.querySelector('.personal-greeting');

// kiedy guzik jest wciśnięty - nie dodawaj kolejnych
form.addEventListener('submit', function (e) {
    e.preventDefault();
});

// obsługa 'Say hello'
submitBtn.addEventListener('click', function () {
    // przechwyć i przechowaj wartość
    localStorage.setItem('name', nameInput.value);
    nameDisplayCheck();

});


//obsługa 'Forget'
forgetBtn.addEventListener('click', function () {
//    usuwamy stare imie
    localStorage.removeItem('name');
    nameDisplayCheck();
});

function nameDisplayCheck() {
    // sprawdzamy czy coś jest pod 'name' w pamięci
    if (localStorage.getItem('name')) {
        let name = localStorage.getItem('name');
        h1.textContent = `Welcome ${name} !`;
        personalGreeting.textContent = 'Witaj na naszej stronie ' + name + '. Mamy nadzieję że Ci się tutaj podoba';
        // ukrywamy część odnośnie 'forget'. Pokazujemy tylko część 'remember'
        rememberDiv.style.display = 'none';
    }
}


// to jest ważne!
// funkcję nameDisplayCheck() trzeba odpalić za każdym razem gdy stona się załaduje
// Inaczej dane nie zostaną zapamiętane/przywołane
document.body.onload = nameDisplayCheck();