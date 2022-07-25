const button = document.getElementById("search-button");
const inputSearch = document.getElementById("search-input");
const countryLocation = document.getElementById("country-title");
const weather = document.getElementById("data");
const description = document.getElementById("description");

//button click event
button.addEventListener('click', function(){
    call();
});

//api calls
function call(){
    console.log("Searcing");
    countryLocation.innerHTML = "Searcing...";
    weather.innerHTML = "-";
    description.innerHTML = "-";

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ inputSearch.value +'&appid=cf5b6acb44941cb461975c7ad6ac6d50')
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name'];
        var temp = data['main']['temp'];
        var descValue = data['weather'][0]['description'];
        console.log(data);
        checkWeather(data['weather'][0]['main']);

        countryLocation.innerHTML = nameValue;
        weather.innerHTML = convertToCelcius(temp) + "\u00B0C";
        description.innerHTML = descValue;
        console.log("Search Done");
    })

    .catch(err => {
        countryLocation.innerHTML = "Invalid Input";
        weather.innerHTML = "-";
        description.innerHTML = "-";
    }); 
}
//start value
inputSearch.value = 'Stockholm';
call();
//convertion
let convertToCelcius = (kelvin) => Math.floor(kelvin - 273.15);

window.addEventListener('keydown', function(event){
    if(event.keyCode == 13){
        call();
    }
});

//background animations:
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let rainParticles = [];

class rainParticle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.yVelocity = 1 + Math.random();
        this.radius = 1;
    }
    draw(){
        c.fillStyle = "rgb(3, 144, 252)";
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        c.fill();
    }
    move(){
        this.y += this.yVelocity;
    }
}

function checkWeather(weatherDescription){
    switch (weatherDescription) {
        case "Rain":
                gradient("raining");
                // canvas.classList.remove('sunnyTheme');
                // canvas.classList.add('rainTheme');
                instantiateRain();
            break;
        default:
                gradient("sunny");
                // canvas.classList.remove('rainTheme');
                // canvas.classList.add('sunnyTheme');
            break;
    }
}

function instantiateRain(){
    for(i = 0; i < 20; i++){
        rainParticles.push(new rainParticle(RandomNum(0, canvas.width), 0));
    }
}
let grd;
function gradient(weather){
    console.log("sss");
    grd = c.createLinearGradient(0, 0, canvas.width, 0);
    if(weather == "sunny"){
        grd.addColorStop(0, 'rgb(0,226,255)');
        grd.addColorStop(1, 'rgb(0,161,255)');
    }else if(weather == "raining"){
        console.log("hhehh");
        grd.addColorStop(0, 'rgb(128,176,182)');
        grd.addColorStop(1, 'rgb(36,60,75)');
    }
}



function update(){
    gradient("raining");
    c.fillStyle = grd;
    c.fillRect(0, 0, canvas.width, canvas.height);

    rainParticles.forEach(particle => {
        particle.draw();
        particle.move();
    });
    requestAnimationFrame(update);
}
update()

let RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function gradient(weather){
    var grd = c.createLinearGradient(0, 0, canvas.width, 0);
    if(weather == "sunny"){
        grd.addColorStop(0, 'rgb(0,226,255)');
        grd.addColorStop(1, 'rgb(0,161,255)');
    }else if(weather == "raining"){
        grd.addColorStop(0, 'rgb(128,176,182)');
        grd.addColorStop(1, 'rgb(36,60,75)');
    }
}
