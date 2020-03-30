$(document).ready(function () {
    console.log('ready!');


    $('#search-btn').click(function () {
        console.log('clicked');
        let searchValue = $('#city-searched').val();
        $('#city-searched').val('');
        searchWeather(searchValue);
        // currentLocationForecast(searchValue);
        fiveDayForecast(searchValue);
        // history (searchVaule);
        buildQueryURL(searchValue);
    });


    function buildQueryURL(searchValue) {

        let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchValue + '&units=imperial&appid=c44d280310ef4a863369e49f9f7d2dba'

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .then(function (response) {
                console.log(response);

                let iconURL = "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>"

                let card = $('<div>').addClass("card");
                let city = $('<h1>').addClass("card-title").text(response.name + " (" + new Date().toLocaleDateString() + ")").append(iconURL);
                let temp = $('<p>').addClass("card-text").text("temperature: " + (response.main.temp));
                let humidity = $('<p>').addClass("card-text").text("Humidity: " + response.main.humidity);
                let windSpeed = $('<p>').addClass("card-text").text("Wind-Speed: " + response.wind.speed);
                // let uvIndex = $('<p>').addClass("card-text").text(response.)

                let cardBody = $('<div>').addClass("card-body");
                cardBody.append(city, temp, humidity, windSpeed);
                card.append(cardBody);

                $('#today').append(card)

                fiveDayForecast(searchValue)
                getUvIndex(response.coord.lat, response.coord.lon)
            })

    }

    function getUvIndex(lat, lon) {

        let uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=c44d280310ef4a863369e49f9f7d2dba&lat=" + lat + "&lon=" + lon;

        $.ajax({
                url: uvQueryURL,
                method: 'GET'
            })
            .then(function (response) {


                // this is not working properly 
                let uvIndex = $('<p>').addClass("card-text").text("UV Index: " + response.value)
                if (uvIndex < 2) {
                    uvIndex.addClass("uvGreen");
                } else if (uvIndex >= 3 && uvIndex <= 6) {
                    uvIndex.addClass("uvYellow");
                } else {
                    uvIndex.addClass("uvRed");
                }


                let card = $('<div>').addClass("card");
                let cardBody = $('<div>').addClass("card-body");
                cardBody.append(uvIndex);
                card.append(cardBody);

                $('#today').append(card)
            })
    }


    function fiveDayForecast(searchValue) {
        let fiveDayURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchValue + '&units=imperial&appid=c44d280310ef4a863369e49f9f7d2dba'

        $.ajax({
                url: fiveDayURL,
                method: 'GET'
            })
            .then(function (response) {
                console.log(response);

                let iconURL = "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>"

                let fiveDay = $('<h1>').addClass("card-title").text('Five Day Forecast');
                let card = $('<div>').addClass("card");
                let temp = $('<p>').addClass("card-text").text("temperature: " + (response.main.temp));
                let humidity = $('<p>').addClass("card-text").text("Humidity: " + response.main.humidity);


                let cardBody = $('<div>').addClass("card-body");
                cardBody.append(fiveDay, iconURL, temp, humidity);
                card.append(cardBody);

                $('#forecast').append(card)


            })

    }


    function searchWeather(searchValue) {

        let searchList = $('<li>').addClass("list-group-item").text(searchValue);
        $('.history').append(searchList)

    };






    // function currentLocationForecast(searchValue) {

    // }




    // function uvIndex() {


    // }


});