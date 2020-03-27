$(document).ready(function () {
    console.log('ready!');


    $('#search-btn').click(function () {
        console.log('clicked');
        let searchValue = $('#city-search').val();
        $('#city-search').val('');
        searchWeather(searchValue);
    });



    function buildQueryURL() {


        let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchValue + '&appid=c44d280310ef4a863369e49f9f7d2dba'


    }

    //function searchWeather 

    //function 5day 

    //function uv index

});