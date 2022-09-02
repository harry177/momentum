const timeField = document.querySelector('.time');
const dateField = document.querySelector('.date');
const greeting = document.querySelector('.greeting');


function showTime() {

const time = new Date();

const currentTime = time.toLocaleTimeString();

timeField.textContent = currentTime;
    
setTimeout(showTime, 1000);

const date = new Date();
const options = {weekday: 'long', month: 'long', day: 'numeric'};
const currentDate = date.toLocaleDateString('en-US', options);
dateField.textContent = currentDate;

function getTimeOfDay() {

  const hours = date.getHours();

  switch (Math.trunc(hours / 6)) {
    case 0: return 'night';
      break;
    case 1: return 'morning';
      break;
    case 2: return 'afternoon';
      break;
    case 3: return 'evening';
  }

}
const timeOfDay = getTimeOfDay();

  greeting.textContent = `Good ${timeOfDay},`;
}

  showTime();






  const setName = document.querySelector('.name');

  function setLocalStorage() {
    localStorage.setItem('name', setName.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
      setName.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage)







  function getRandomNum(min, max) {
   return  Math.trunc(Math.random() * (max - min) + min);
  }

  function getTimeOfDay() {

    const date = new Date();
    const hours = date.getHours();
  
    switch (Math.trunc(hours / 6)) {
      case 0: return 'night';
        break;
      case 1: return 'morning';
        break;
      case 2: return 'afternoon';
        break;
      case 3: return 'evening';
    }
  
  }
  let number = getRandomNum(1, 20);

  function setBg() {

    const timeOfDay = getTimeOfDay();
    

    const bgNum = String(number).padStart(2, '0');

    const image = new Image();

    image.src = `https://raw.githubusercontent.com/harry177/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    image.onload = () => {
    document.body.style.backgroundImage = `url(${image.src})`;
  }; 

  }

setBg();


function getSlideNext() {
  if (number < 20) {
    number += 1;
  } else {
    number = 1;
  }
  setBg();
}

function getSlidePrev() {
  if (number > 1) {
    number -= 1;
  } else {
    number = 20;
  }
  setBg();
}

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


//  weather //


const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');

city.addEventListener('change', getWeather);

city.value = 'Minsk';


async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=1021eba9700aa65fcaaa2e7041d42524&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  

  
    
    if (city.value !== data.name) {
      weatherError.textContent = 'Wrong request';
      weatherIcon.className = undefined;
      temperature.textContent = undefined;
      weatherDescription.textContent = undefined;
      wind.textContent = undefined;
      humidity.textContent = undefined;

    } else {
      weatherError.textContent = undefined;
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
  
    }
}
getWeather()



function setStorageOfCity() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setStorageOfCity)

function getStorageOfCity() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
    getWeather();
  }
}
window.addEventListener('load', getStorageOfCity)


// qoutes //

const quoteField = document.querySelector('.quote');
const authorFireld = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote')





async function getQuotes() {  
  const quotes = './quotes.json';
  const res = await fetch(quotes);
  const data = await res.json(); 

  let quotesNumber = getRandomNum(1, 30);

  quoteField.textContent = data[quotesNumber].text;
  authorFireld.textContent = data[quotesNumber].author;

}
getQuotes();


quoteButton.addEventListener('click', getQuotes);


// player //
import playList from './playList.js';

let isPlay = false;

const playButton = document.querySelector('.play');

const audio = new Audio();

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  activeSong[playNum].classList.toggle('item-active');

  if (isPlay === false) {
    audio.play();
    isPlay = true;
    playButton.classList.toggle('pause');
  } else if (isPlay === true) {
    audio.pause();
    isPlay = false;
    playButton.classList.toggle('pause');
}
}

function TrackProgress() {
  if (Math.floor(audio.currentTime) === Math.floor(audio.duration)) {
    playNext();
  }
}

setInterval(TrackProgress, 1000);



playButton.addEventListener('click', playAudio);



const playListContainer = document.querySelector('.play-list');

const activeSong = playListContainer.childNodes;

console.log(activeSong);



playList.forEach(el => {
const li = document.createElement('li');
li.classList.add('play-item');
li.textContent = `${el.title} -> ${el.duration}`;
playListContainer.append(li);


});

let playNum = 0;

const playNextButton = document.querySelector('.play-next');
const playPrevButton = document.querySelector('.play-prev');

function playNext() {

  if (playNum === playList.length - 1) {
    playNum = 0;
    isPlay = false;
    playButton.classList.remove('pause');
    activeSong[playList.length-1].classList.toggle('item-active');
  } else {
    playNum++;
    isPlay = false;
    playButton.classList.remove('pause');
    activeSong[playNum-1].classList.toggle('item-active');
  }
  playAudio();
};


function playPrev() {

  if (playNum === 0) {
    playNum = playList.length - 1;
    isPlay = false;
    playButton.classList.remove('pause');
    activeSong[0].classList.toggle('item-active');
  } else {
    playNum--;
    isPlay = false;
    playButton.classList.remove('pause');
    activeSong[(playNum+1)].classList.toggle('item-active');
  } 
  
  playAudio();

}

playNextButton.addEventListener('click', playNext);
playPrevButton.addEventListener('click', playPrev);


activeSong.forEach((el, index) => {
  el.addEventListener('click', function() {
    if (playNum === index && isPlay === true) {
      isPlay = true;
    } else {
      isPlay = false;
      play.classList.remove('pause');
      activeSong[playNum].classList.remove('item-active');
    }
    playNum = index;
    playAudio();
  })
});