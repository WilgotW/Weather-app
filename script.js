const button = document.getElementById("search-button");
const inputSearch = document.getElementById("search-input");

button.addEventListener('click', function(){
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+ inputSearch.value +'&appid={cf5b6acb44941cb461975c7ad6ac6d50}')
        .then(response => response.json())
        .then(data => console.log(data))

    .catch(err => alert("Wrong city name"));

});


