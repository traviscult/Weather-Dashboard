$(document).ready(function () {
    console.log('ready!');


    $('#search-btn').click(function () {
        console.log('clicked');
        let searchValue = $('#city-searched').val();
        $('#city-searched').val('');
        history(searchValue);
        fiveDayForecast(searchValue);
        buildQueryURL(searchValue);
    });

    $(".history-btn").on("click","button", function(){
        searchValue = $('.history-btn').text()
        console.log(searchValue)
        buildQueryURL($(this).text());
    });


    function buildQueryURL(searchValue) {

        let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchValue + '&units=imperial&appid=c44d280310ef4a863369e49f9f7d2dba'

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .then(function (response) {
                console.log(response);
                $('#today').empty();

                let iconURL = "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>"

                let card = $('<div>').addClass("card");
                let city = $('<h1>').addClass("card-title").text(response.name + " (" + new Date().toLocaleDateString() + ")").append(iconURL);
                let temp = $('<p>').addClass("card-text").text("temperature: " + (response.main.temp));
                let humidity = $('<p>').addClass("card-text").text("Humidity: " + response.main.humidity);
                let windSpeed = $('<p>').addClass("card-text").text("Wind-Speed: " + response.wind.speed);

                let cardBody = $('<div>').addClass("card-body");
                cardBody.append(city, temp, humidity, windSpeed);
                card.append(cardBody);

                $('#today').append(card)

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

                // I do not think this is working properly 
                let uvIndex = $('<p>').addClass("card-text").text("UV Index: " + response.value)
                if (uvIndex < 2) {
                    uvIndex.addClass("btn btn-primary");
                } else if (response.value >= 3 && response.value <= 6) {
                    uvIndex.addClass("btn btn-warning");
                } else {
                    uvIndex.addClass("btn btn-danger");
                }

                let card = $('<div>').addClass("card");
                let cardBody = $('<div>').addClass("card-body");
                cardBody.append(uvIndex);
                card.append(cardBody);

                $('#today').append(card)
            })
    }


    //figure out how to put cards in a div
    function fiveDayForecast(searchValue) {
        let fiveDayURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchValue + '&units=imperial&appid=c44d280310ef4a863369e49f9f7d2dba'

        $.ajax({
                url: fiveDayURL,
                method: 'GET'
            })
            .then(function (response) {
                $('#forecast').empty();

                let fiveDay = $('<h1>').addClass("card-title").text('Five Day Forecast').append("<div class=\"row\">");
                $('#forecast').append(fiveDay)
                
                let newArr = response.list.filter((_,i) => i % 8 == 0); 

                for (let i = 0; i < 5; i++) {
                    console.log('this is being called')
                    const element = newArr[i]; 
                    console.log("fiveDayForecast -> element", element)
                    
                    let iconFiveURL = "<img src='http://openweathermap.org/img/wn/" + element.weather[0].icon + "@2x.png'>"
                    let date = $('<p>').addClass("font").text(new Date(element.dt_txt).toLocaleDateString()).append(iconFiveURL) 
                    let cardBody = $('<div>').addClass("card-body");
                    let temp = $('<p>').addClass("card-text font").text("temperature: " + (element.main.temp));
                    let humidity = $('<p>').addClass("card-text font").text("Humidity: " + element.main.humidity);
                    let card = $('<div>').addClass("card col-sm-2 text-white bg-primary weatherCard");
                    
                    cardBody.append(date, temp, humidity);
                    card.append(cardBody)
                    $('#forecast .row').append(card)
                }
            })

    }

    //append the searched cities to a search hisrtory list 
    function history(searchValue) {

        let searchList = $('<li>').addClass("list-group-item");
        let button = $("<button>").addClass("history-btn btn").text(searchValue);
        $('.history').append(searchList);
        searchList.append(button);
    };

});