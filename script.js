const button = document.getElementById("search-button");
const inputSearch = document.getElementById("search-input");
const countryLocation = document.getElementById("country-title");
const weather = document.getElementById("data");
const description = document.getElementById("description");

button.addEventListener('click', function(){
    call();
});

function call(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ inputSearch.value +'&appid=cf5b6acb44941cb461975c7ad6ac6d50')
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name'];
        var temp = data['main']['temp'];
        var descValue = data['weather'][0]['description'];

        countryLocation.innerHTML = nameValue;
        weather.innerHTML = convertToCelcius(temp) + "\u00B0C";
        description.innerHTML = descValue;
    })

    .catch(err => alert("Wrong city name"));
}
inputSearch.value = 'Stockholm';
call();

let convertToCelcius = (kelvin) => Math.floor(kelvin - 273.15);
