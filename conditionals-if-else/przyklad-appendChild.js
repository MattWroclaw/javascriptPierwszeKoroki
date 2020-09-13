const output = document.querySelector(".output");

let i = 10;

while (i>=0) {
    // tak tworzymy paragraf
    let para = document.createElement('p');
    if(i === 10) {
        para.textContent = 'Countdown ' + i;
    } else if(i === 0) {
        para.textContent = 'Blast off!';
    } else {
        para.textContent = i;
    }
    // tak przypisujemy go do div'a
    output.appendChild(para);
    i--;
}