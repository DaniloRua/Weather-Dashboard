
$('#search-button').on("click", function (event) {
    var city = $('#search-input').val()
    event.preventDefault()
    getCoordinates(city)

})

function getCoordinates(city) {
    let queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=059158fd829c06a2a0fee4443308c7ba`
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;

            getWeather(lat,lon)
        });

}

function getWeather(lat, lon) {

    var getFiveDays = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=059158fd829c06a2a0fee4443308c7ba`

    fetch(getFiveDays)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            console.log(data.list[0].main.temp)

        });
}

