const apiURL = "http://api.openweathermap.org/data/2.5/weather";
//need to input key somehow
const appId = "APPID=b113558884743a089516dcd3172bc769";
const form = document.querySelector("form");
const seattleCoord = {lat: 47.6762, lon: -122.3182};
const londonCoord = {lat: 51.5074, lon: 0.1278};
var selectedCity = '';
var audio = document.getElementById("weatherSound")


let debug = null;

function handleSubmit() {
  event.preventDefault();
  console.log(form);
  //get form values
  var cityPick = form.citySelect.value; //this will make value the city selected
    if(form.citySelect.value === "Seattle") {
      cityPick = seattleCoord;
    } else {
      cityPick = londonCoord;
    }
    //serialize them into a query string
    let queryString = queryBuilder(cityPick);
    //call getWeather with the query string
    getWeather(queryString);
    audio.play();
  }

  //put values into a string

  // if (selectedCity === "Seattle") {
  //   queryString = `?${apiURL}?${seattleCoord}&APPID=${appId}`
  // } else {
  //   queryString = `?${apiURL}?${londonCoord}&APPID=${appId}`
  // }
  // return queryString


function getWeather(queryString) {
  let request = new XMLHttpRequest();
  //starts talking to API - 3 params
  request.open("GET", apiURL + queryString, true);
  //fires when the request is complete
  //long term - update the DOM
  //short term - show me what I've got
  request.onload = function() {
    let response = JSON.parse(request.response);
    let temperature = response.main.temp;

    let reportDiv = document.getElementById("weatherResults");
    var p = document.createElement("p");
    p.innerHTML = "The temperature is " + temperature;
    reportDiv.appendChild(p);
  }

  //fires if something goes wrong
  request.error = function(errorObject) {
    console.log("Ruh roh")
    console.log(errorObject)
  }

  //send the request
  request.send()
}


// function queryBuilder(queryObj) {
//   if(form.citySelect.value === "Seattle") {
//     return '${apiURL}?{seattleCoord}&APPID=${appId}'
//   } else {
//     return '${apiURL}?{londonCoord}&APPID=${appId}'
//   }
// }

//REPLACE ALL THIS WITH AN EXPLICITLY STATED IF/ELSE
//OpenWeatherMap's API call for geo coord: api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon} ADD KEY

//  http://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=0.1278&b113558884743a089516dcd3172bc769

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
