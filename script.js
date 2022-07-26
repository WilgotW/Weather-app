const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

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
let rainParticles = [];
let cloudParticles = [];
let grd;
let rainInterval;
let cloudInterval;

class rainParticle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.yVelocity = 2 + Math.random();
        this.radius = 1;
    }
    draw(){
        c.fillStyle = "rgb(3, 144, 252)";
        c.fillRect(this.x, this.y, this.radius * 2, this.radius*5);
    }
    move(){
        this.y += this.yVelocity;
        
    }
}
class cloudParticle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.xVelocity = 0.5 + Math.random();
        this.size = 0.75 + Math.random()*2;
    }
    draw(){
        //Cloud drawing:
        c.fillStyle = "white";
        c.beginPath();
        c.arc(this.x + this.size, this.y+15 + this.size, 30 + this.size, 0, Math.PI * 2);
        c.arc(this.x+30 + this.size, this.y + this.size, 20 + this.size, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(this.x+50 + this.size, this.y+22 + this.size, 20 + this.size, 0, Math.PI * 2);
        c.fill();
        c.fillRect(this.x+4 + this.size, this.y+14 + this.size, 53 + this.size, 25 + this.size);
    }
    move(){
        this.x += this.xVelocity;
    }
}
grd = c.createLinearGradient(0, 0, canvas.width, 0);
grd.addColorStop(0, 'rgba(0,226,255)');
grd.addColorStop(1, 'rgba(0,161,255)');
function checkWeather(weatherDescription){
    switch (weatherDescription) {
        case "Rain":
                if(cloudInterval != undefined){
                    clearInterval(cloudInterval);
                    cloudInterval = undefined;
                    removeParticles(cloudParticles);
                }
                if(rainInterval == undefined){
                    rainInterval = setInterval(instantiateRain, 100);
                    gradient("raining");
                }
            break;
        default:
                
                if(rainInterval != undefined){
                    clearInterval(rainInterval);
                    rainInterval = undefined;
                    removeParticles(rainParticles);
                }
                
                if(cloudInterval == undefined){
                    cloudInterval = setInterval(instantiateClouds, 5000);
                    console.log("hej");
                    gradient("sunny");
                }
            break;
    }
}


function instantiateRain(){
    for(i = 0; i < 10; i++){
        rainParticles.push(new rainParticle(RandomNum(0, canvas.width), 0));
    }
}

function instantiateClouds(){
    for(let i = 0; i < 1; i++){
        cloudParticles.push(new cloudParticle(-100, RandomNum(0, canvas.height)));
    }
}

function update(){
    c.fillStyle = grd;
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    rainParticles.forEach(particle => {
        particle.draw();
        particle.move();
        if(particle.y > canvas.height){
            rainParticles.splice(particle, 1);
        }
    });
    cloudParticles.forEach(particle => {
        particle.draw();
        particle.move();
    });

    requestAnimationFrame(update);
}
update()

function removeParticles(particleArray){
    particleArray.splice(0,particleArray.length);
}

function gradient(weather){
    grd = c.createLinearGradient(0, 0, canvas.width, 0);
    if(weather === "sunny"){
        console.log("suuuu");
        grd.addColorStop(0, 'rgb(0,226,255)');
        grd.addColorStop(1, 'rgb(0,161,255)');
    }else if(weather === "raining"){
        console.log("hhheee");
        grd.addColorStop(0, 'rgb(128,176,182)');
        grd.addColorStop(1, 'rgb(36,60,75)');
    }    
}
let RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
