//set the variables fron the HTML
let city = document.querySelector('.location .city');
let date = document.querySelector('.location .date');
let temp = document.querySelector('.current .temp');
let weatherElement = document.querySelector('.current .weather');
let highLow = document.querySelector('.hi-low');
const searchBox = document.querySelector('.search-box');
const body = document.querySelector('body');
let searchValue = document.getElementById('searchValue');

const api = {
    key: "f32dadb979e8e61c83f422719890fff4",
    base: "https://api.openweathermap.org/data/2.5/"
}

//Set the details if the enter button is pressed
const setQuery = (evt) => {
    if(evt.keyCode == 13) {
        getResults(searchBox.value);
    }
}

//set the value of based on the entry in the search box
searchBox.addEventListener('keypress', setQuery)

//get the results from the api and call displayResults function
const getResults = (query) => {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(currentWeather => {
        return currentWeather.json();
    }).then(displayResults);
}

//display the results on page
const displayResults = (currentWeather) => {
    console.log(currentWeather);
    city.innerHTML = `${currentWeather.name}, ${currentWeather.sys.country}`

    //set the details of the page
    let current = new Date();
    date.innerHTML = dateBuilder(current);

    //temperature
    temp.innerHTML = `${Math.round(currentWeather.main.temp)}<span>°F</span>`;

    //weather
    weatherElement.innerHTML = currentWeather.weather[0].main;

    //high and low for current date
    highLow.innerHTML = `${Math.round(currentWeather.main.temp_min)}°F / ${Math.round(currentWeather.main.temp_max)}°F`;
}

//Get the current date details
const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let currentDay = days[d.getDay()];
    let currentDate = d.getDate();
    let currentMonth = months[d.getMonth()];
    let currentYear = d.getFullYear();

    return `${currentDay} ${currentDate} ${currentMonth} ${currentYear}`;
}


