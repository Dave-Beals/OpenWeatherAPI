const apiURL = "http://api.openweathermap.org/data/2.5/weather"
//need to input key somehow
const appID = "b113558884743a089516dcd3172bc769"
const form = document.querySelector("form")
const seattleCoord = {lat: 47.6762, lon: -122.3182}
const londonCoord = {lat: 51.5074, lon: 0.1278}

let debug = null

function handleSubmit() {
  event.preventDefault()
  console.log(form)
  //get form values
  let citySelection = form.citySelect.value
  //match citySelection to coordinates
  if (citySelection == "Seattle"){
    let citySelection = seattleCoord
  } else {
    let citySelection = londonCoord
  }
  //put values into a string
  let queryString = queryBuilder(citySelection)
  //call getWeather with the query string
  getweather(queryString)
}

function getWeather(queryString) {
  // weatherSound.play()
  let request = new XMLHttpRequest()

  //starts talking to API - 3 params, which are
  //request method, url (optional?) async flag (default true)
  request.open("GET", apiURL + appID, true)

  //fires when the request is complete
  //long term - update the DOM
  //short term - show me what I've got
  request.onload = function() {
    let reportDiv = document.getElementById("weatherResults")
    let response = JSON.parse(request.response)
    console.log(response.body)
  }

  //fires if something goes wrong - THIS CAN BE DONE WITH A FRAMEWORK DOWN THE ROAD
  request.error = function(errorObject) {
    console.log("bwoken")
    console.log(errorObject)
  }

  //send the request
  request.send()
}
