const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */


for (let i=1; i<=5; i++){
    const newImage = document.createElement('img');
   let xxx='images/pic'+i+'.jpg';
    newImage.setAttribute('src', xxx);
    newImage.addEventListener('click', function () {
        displayedImage.setAttribute('src', xxx)
    });
    thumbBar.appendChild(newImage);
}

btn.onclick = function () {
    let currenClassName = btn.getAttribute('class');
    currenClassName === "dark" ? (
        btn.setAttribute('class','Lighten'),
        btn.textContent = "Light-en",
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)"
    ) :
    ( btn.setAttribute('class', "dark"),
    btn.textContent = "Dark-en",
    overlay.style.backgroundColor ="rgba(0,0,0,0)")
}
/* Wiring up the Darken/Lighten button */
