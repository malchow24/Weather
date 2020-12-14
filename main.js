const api = {
    key: "f32dadb979e8e61c83f422719890fff4",
    base: "https://api.openweathermap.org/data/2.5/"
}

const body = document.querySelector('body');

const images = [
    {image: './Images/Clouds.jpg'}
]

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery)

function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResults(searchBox.value);
    }
};

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
};

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;
    
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
};

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[d.getDay()];
let date = d.getDate();
let month = months[d.getMonth()];
let year = d.getFullYear();

return `${day} ${date} ${month} ${year}`;
}