const people = ['Chris', 'Anne', 'Colin', 'Terri', 'Phil', 'Lola', 'Sam', 'Kay', 'Bruce'];

const admited = document.querySelector('.admited');
const refused = document.querySelector('.refused');

admited.textContent = 'Admit: ';
refused.textContent = 'Refuse: ';

let i=0;
do  {
    if (people[i] === 'Phil' || people[i] === 'Lola') {
            refused.textContent += people[i] + ', ';
    }
    else {
        admited.textContent += people[i] + ', ';
    }
    i++;
} while (i<people.length);

refused.textContent = refused.textContent.slice(0,refused.textContent.length-2)+'.';
admited.textContent = admited.textContent.slice(0,admited.textContent.length-2)+'.';