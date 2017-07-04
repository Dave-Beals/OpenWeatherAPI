const apiURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather"
//need to input key somehow
const appID = "b113558884743a089516dcd3172bc769"
const form = document.getElementById("apiOptions")

let debug = null

function handleSubmit() {
  event.preventDefault()
  //get form values
  let form = document.querySelector("form")
  let citySelection = form.citySelect.value
  console.log(citySelection)


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
