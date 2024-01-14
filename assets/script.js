
$('#search-button').on("click", function (event) {
  
    var city = $('#search-input').val()
    event.preventDefault()
    getCoordinates(city)
  $('#search-input').val('')


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

            getWeather(lat, lon)
        });

}

function getWeather(lat, lon) {

    var getFiveDays = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=059158fd829c06a2a0fee4443308c7ba`

    getMainTemp(lat, lon)
    fetch(getFiveDays)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

        });
}

function getMainTemp(lat, lon) {
    var api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=059158fd829c06a2a0fee4443308c7ba`

    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var currentTemp = (data.main.temp + (-273.15)).toFixed(1)
            cityData = [data.name, data.weather[0].icon, data.main.temp, data.wind.speed, data.main.humidity,]
    
            TodayEl(cityData)
        });

}

function TodayEl(data) {
    var cityName = data[0];
    var iconCode = data[1];
    var todayTemp = data[2] +( -273.15)
    var iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    console.log(iconUrl)
    var date = dayjs().format('DD/MM/YYYY');
    var icon = $('<img>').attr('src',iconUrl)
    console.log(icon)

     $('#city-date').text(cityName + " " + date + " " )
     $('#city-date').append(icon)
     
    $('#temp').text("Temperature: " +  todayTemp.toFixed(1) + " C°")
    $('#wind').text("Wind speed: " +   data[3] + "Km")
    $('#humidity').text("Humidity: " +data[4])
}

function nextFiveDays(){

}


//next five days weather

//populate the cards