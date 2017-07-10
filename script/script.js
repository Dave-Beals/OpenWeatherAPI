const apiURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather";
//need to input key somehow
const appId = "APPID=b113558884743a089516dcd3172bc769";
const form = document.querySelector("form");
const seattleCoord = {lat: 47.6762, lon: -122.3182};
const londonCoord = {lat: 51.5074, lon: 0.1278};
let locCoord = "";
let newLoc = "";
var audio = document.getElementById("weatherSound");


let debug = null;

function weatherClick() {
  event.preventDefault();

    let queryString = queryBuilder(locCoord);
    //call getWeather with the query string
    getWeather(queryString);
  }

//new functions for button onclicks.
document.getElementById("seattle").onclick = function() {
  locCoord = seattleCoord;
  console.log(locCoord);
}

document.getElementById("london").onclick = function() {
  locCoord = londonCoord;
  console.log(locCoord);
}

//function to get user loc from browser and set as locCoord. Move success and error here
document.getElementById("userLoc").onclick = function() {
  navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError);
  function geolocSuccess(position){
      locCoord = {lat: position.coords.latitude, lng: position.coords.longitude};
      console.log(locCoord);
  }
  function geolocError(){
       console.log("Error getting your location")
   }
}



function getWeather(queryString) {
  let request = new XMLHttpRequest();
  //starts talking to API - 3 params
  request.open("GET", apiURL + queryString, true);
  //fires when the request is complete
  //long term - update the DOM
  //short term - show me what I've got
  //tweak below to start new function that can serve Seattle, London, AND userLoc
  request.onload = function() {
    let response = JSON.parse(request.response);
    let temperature = response.main.temp;

    let reportDiv = document.getElementById("weatherResults");
    var p = document.createElement("p");
    p.innerHTML = "The temperature is " + temperature;
    reportDiv.appendChild(p);
    audio.play();
  }

  //fires if something goes wrong
  request.error = function(errorObject) {
    console.log("Ah jeez.")
    console.log(errorObject)
  }

  //send the request
  request.send()
}


//OpenWeatherMap's API call for geo coord: api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon} ADD KEY



function queryBuilder(queryObj) {
  let holder = [];
  //loop through key value pairs
  for(let key in queryObj){
    //turn each on into "key-value"
       let convert = `${encodeURIComponent(key)}=${encodeURIComponent(queryObj[key])}`;
       // encodeURIComponent converts spaces and & to URI friendly values so we don't have to worry about them
       holder.push(convert);
     }
//      // concatenate the pairs together, with & between
     let longString = holder.join("&");
//      // prepend a ? to concatenated string, return. Also append w/ lat long and appID
     return `?${longString}&${appId}`;
   }

   document.addEventListener("DOMContentLoaded", function() {
     seattle.addEventListener("click", weatherClick);
     london.addEventListener("click", weatherClick);
     userLoc.addEventListener("click", weatherClick);
 })
