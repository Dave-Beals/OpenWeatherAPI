const apiURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather"
//need to input key somehow
const APPID = "b113558884743a089516dcd3172bc769"

function getWeatherSeattle(queryString) {
  // weatherSound.play()
  let request = new XMLHttpRequest()

  //starts talking to API - 3 params, which are
  //request method, url (optional?) async flag (default true)
  request.open("GET", apiURL, true)

  //fires when the request is complete
  //long term - update the DOM
  //short term - show me what I've got
  request.onload = function() {
    console.log(request)
  }

  //fires if something goes wrong
  request.error = function(errorObject) {
    console.log("bwoken")
    console.log(errorObject)
  }

  //send the request
  request.send()
}

function getWeatherLondon() {
  // weatherSound.play()
}
