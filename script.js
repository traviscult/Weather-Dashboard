$(document).ready(function () {
    console.log('ready!');

    
    $('#search-btn').click(function () {
        console.log('clicked');
        let searchValue = $('#city-searched').val();
        $('#city-searched').val('');
        searchWeather(searchValue);
        currentLocationForecast(searchValue);
        fiveDayForecast(searchValue);
        // history (searchVaule);
        buildQueryURL(searchValue)
    });

    
    function buildQueryURL(searchValue) {

        let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchValue + '&appid=c44d280310ef4a863369e49f9f7d2dba'

        $.ajax({
            url: queryURL,
            method: 'GET'
           })
           .then(function(response){
            console.log(response);

            let card = $('<div>').addClass("card")
            let city = $('<h1>').addClass("card-title").text(response.name + " (" + new Date().toLocaleDateString() + ")")
            let temp = $('<p>').addClass("card-text").text("temperature: " + ((response.main.temp - 273.15) * 9/5 +32).toFixed(2))
            let humidity = $('<p>').addClass("card-text").text("Humidity: " + response.main.humidity)
            let windSpeed = $('<p>').addClass("card-text").text("Wind-Speed: " + response.wind.speed)
            // let uvIndex = $('<p>').addClass("card-text").text(response.)

            let cardBody = $('<div>').addClass("card-body");
            cardBody.append(city, temp, humidity, windSpeed);
            card.append(cardBody);

            $('#today').append(card)
        
           })

    }

    function getUvIndex(){

        let uvQuery 
        
    }

   function searchWeather(){

   }


   function currentLocationForecast (searchValue){
      


   }


    function fiveDayForecast(){

    }

  function uvIndex () {


  }

  
});