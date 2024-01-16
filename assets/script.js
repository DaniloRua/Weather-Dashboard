let history = [];

$('#search-button').on("click", function (event) {
    event.preventDefault();
    var city = $('#search-input').val().trim();
    if (city !== '') {
        getCoordinates(city);
        addHistoryButton(city);
        $('#search-input').val('');
    } else {
        alert('Please enter a city name');
    }
});

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
    for (let i = 0; i < 5; i++) {
        let nextDaysCards = $(`#card${i + 1}`);
        nextDaysCards.empty();
        // //add date
        let nextDates = $('<h5>').text(dayjs(data[i].dt_txt).format("DD/MM/YYYY"));
        let nextDatesTemp = $('<p>').text("Temperature: " + (data[i].main.temp + (-273.15)).toFixed(1) + "°C");
        let nextDatesHumidity = $('<p>').text("Wind speed: " + data[i].wind.speed + "Kph");
        let nextDatesWind = $('<p>').text("Humidity: " + data[i].main.humidity + "%");
        nextDaysCards.append(nextDates, nextDatesTemp, nextDatesHumidity, nextDatesWind);
    }
}

//trigger the example of search
$(document).ready(function () {
    getCoordinates('London');
});

function addHistoryButton(city) {

        history.unshift(city);
        localStorage.setItem('weatherAppHistory', JSON.stringify(history));
        $('#history').empty();
        if (history.length > 10) {
            history.pop();
        }
        renderHistorybuttons()
}

function renderHistorybuttons(){
    for (let i = 0; i < history.length; i++) {
        const a = $("<button>");
        a.addClass("btn-secondary round-1");
        a.attr("data-name", history[i]);
        a.text(history[i]);
            a.click(function () {
                getCoordinates(history[i]);
            });
            $("#history").append(a);
        }
}

//load history from localstorage
function loadHistoryLocalStorage() {
    let storedHistory = localStorage.getItem('weatherAppHistory');
        history = JSON.parse(storedHistory);
       renderHistorybuttons();    
}

//call function when page is loaded
$(document).ready(function () {
    loadHistoryLocalStorage();
});

//delte history buttons
$('#delete-history').on('click', function(){
    localStorage.removeItem('weatherAppHistory');
    history = []; 
    $('#history').empty(); 
})