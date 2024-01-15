$('#search-button').on("click", function (event) {

    var city = $('#search-input').val()

    getCoordinates(city)
    $('#search-input').val('')
    event.preventDefault()
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
            getFiveDays(lat, lon)
        });
}

function getFiveDays(lat, lon) {

    var fiveDaysAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=059158fd829c06a2a0fee4443308c7ba`

    getMainTemp(lat, lon)
    fetch(fiveDaysAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // collection of the next five days data



            var fiveDaysData = [data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]]
            console.log(data)
            nextFiveDays(fiveDaysData)


        });
}

function getMainTemp(lat, lon) {
    var API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=059158fd829c06a2a0fee4443308c7ba`

    fetch(API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityData = [data.name, data.weather[0].icon, data.main.temp, data.wind.speed, data.main.humidity,]
            TodayEl(cityData)
        });
}

function TodayEl(data) {
    let cityName = data[0];
    let iconCode = data[1];
    let todayTemp = data[2] + (-273.15)
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    let date = dayjs().format('DD/MM/YYYY');
    let icon = $('<img>').attr('src', iconUrl)
    $('#city-date').text(cityName + " " + date + " ")
    $('#city-date').append(icon)
    $('#temp').text("Temperature: " + todayTemp.toFixed(1) + " C°")
    $('#wind').text("Wind speed: " + data[3] + "Kph")
    $('#humidity').text("Humidity: " + data[4] + "%")
}

function nextFiveDays(data) {

    console.log(data)
    for (let i = 0; i < 5; i++) {
        let nextDaysCards = $(`#card${i + 1}`);
        nextDaysCards.empty();
        // //add date
        let nextDates = $('<h5>').text(dayjs(data[i].dt_txt).format("DD/MM/YYYY"));
        let nextDatesTemp =$('<p>').text("Temperature: " +  (data[i].main.temp + (-273.15)).toFixed(1) + "°C");
        let nextDatesHumidity = $('<p>').text("Wind speed: " + data[i].wind.speed + "Kph");
        let nextDatesWind = $('<p>').text("Humidity: " +data[i].main.humidity + "%");
            
        
        nextDaysCards.append(nextDates, nextDatesTemp, nextDatesHumidity,nextDatesWind);


    }

}

$(document).ready(function () {
    getCoordinates('London');
});
