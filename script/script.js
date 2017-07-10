const apiURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather";
//need to input key somehow
const appId = "APPID=b113558884743a089516dcd3172bc769";
const form = document.querySelector("form");
const seattleCoord = {lat: 47.6762, lon: -122.3182};
const londonCoord = {lat: 51.5074, lon: 0.1278};
let newLoc = [];
var audio = document.getElementById("weatherSound");


let debug = null;

function handleSubmit() {
  event.preventDefault();
  console.log(form);
  
  function newLocation() {
    navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError);
  }

  function geolocSuccess(position) {
    const newPos = {lat: position.coords.latitude, lng: position.coords.longitude};
    newLoc.push(newPos);
    console.log(newPos);
    //getLocation(newPos);
  }

  function geolocError(){
    console.log("Error getting user's location")

  //get form values
  var cityPick = form.citySelect.value; //this will make value the city selected
    if(form.citySelect.value === "Seattle") {
      cityPick = seattleCoord;
    } else if(form.citySelect.value === "London") {
      cityPick = londonCoord;
    } else if(form.citySelect.value === "userLoc") {
      cityPick = newLoc;
    }
    //serialize them into a query string
    let queryString = queryBuilder(cityPick);
    //call getWeather with the query string
    getWeather(queryString);
    audio.play();
  }

// function newLocation() {
//   navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError);
// }
//
// function geolocSuccess(position) {
//   const newPos = {lat: position.coords.latitude, lng: position.coords.longitude};
//   newLoc.push(newPos);
//   console.log(newPos);
//   //getLocation(newPos);
// }
//
// function geolocError(){
//   console.log("Error getting user's location")
// }

// function onerrorFunc(){
//   printListItem("Sorry, an error occured");
// }
//
// // function getLocation(locObj) {
// //   let mapUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locObj.lat},${locObj.lng}&key=AIzaSyA5d8ZwO3RgYJsVYzTKue_IuBK0nxTfeFY`;
// //   let request = new XMLHttpRequest();
// //   request.open("GET", mapUri, true);
// //   //create onload func
// //   request.onload = onloadFunc;
// //   //tie to existing onerror
// //   request.onerror = onerrorFunc;
// //   request.send();
// // }
// //
// // function onloadFunc(){
// //   const resp = JSON.parse(this.response);
// //   console.log(resp);
// //   if(resp.results.length>0){
// //     printListItem(resp.results[0].formatted_address);
// //   } else {
// //     printListItem("No results were found");
// //   }
// // }

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
