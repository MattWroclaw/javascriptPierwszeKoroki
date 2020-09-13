//1. VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

//2. RAW TEXT STRINGS

let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

let insertX = ["Willy the Goblin",
    "Big Daddy",
    "Father Christmas"]

let insertY = ["the soup kitchen",
    "Disneyland",
    "the White House"];

let insertZ = ["spontaneously combusted",
    "melted into a puddle on the sidewalk",
    "turned into a slug and crawled away"];

// 3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION


function result() {
    let newStory = storyText;
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    if (customName.value !== '') {
        let name = customName.value;
        newStory = `It was 94 fahrenheit outside, so ${name} went for a walk. When they got to ${yItem} , they stared in horror for a few moments, then ${zItem}. Bob saw the whole thing, but was not surprised — ${xItem} weighs 300 pounds, and it was a hot day.`;
    } else {
        let defaultName = 'Bob';
        newStory = `It was 94 fahrenheit outside, so  ${defaultName} went for a walk. When they got to ${yItem} , they stared in horror for a few moments, then ${zItem}. Bob saw the whole thing, but was not surprised — ${xItem} weighs 300 pounds, and it was a hot day.`;

    }

    if (document.getElementById("uk").checked) {
        let weight = Math.round(300);
        let temperature = Math.round(94);
        newStory = `It was ${temperature} celcius outside, so ${name !== '' ? xItem : 'Bob'} went for a walk. When they got to ${yItem} , they stared in horror for a few moments, then ${zItem}. Bob saw the whole thing, but was not surprised — ${xItem} weighs ${weight} kg and it was a hot day.`;
    }


    story.textContent = newStory;
    story.style.visibility = 'visible';
}

randomize.addEventListener('click', result);
