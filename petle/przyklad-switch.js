const select = document.querySelector('select');
const para = document.querySelector('.komentarz');

select.addEventListener('change', ustawPogode);

function ustawPogode() {
    const wybor = select.value;

    switch (wybor) {
        case 'sunny':
            para.textContent = 'Słoneczko świeci i jest fajnie';
            break;

        case 'rainy':
            para.textContent = "Pada, zabierz parasol";
            break;

        case 'snowing':
            para.textContent = 'Można iść na sanki';
            break;

        case 'overcast':
            para.textContent = 'Pochmurno i wieje';
            break;

        default:
            para.textContent = '';

    }

}