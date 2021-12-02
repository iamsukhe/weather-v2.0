
$(document).ready(async function () {

   getLocation()
   topbar.show();
    var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

async function showPosition(position) {
  console.log( "Latitude: " + position.coords.latitude + 
  "Longitude: " + position.coords.longitude );
  

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&" + "lon="+ lon + "&appid=6ab72bcbc823941d15c76e4d6d3d59b0&units=metric#");
  const apiData = await response.json();
  console.log("Data", apiData);

  $("#name").text(apiData.name)
  $("#main-temp").text(apiData.main.temp)
  const icon = apiData.weather[0].icon;
  const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
  $("#image").attr("src", imageURL);
  $("#disc").text( apiData.weather[0].description)
  showPage()
  topbar.hide()

}

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.")
        break;
    }
}


function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
  }

  $("#form-main").on("submit", async function (e) {
    e.preventDefault();
    document.getElementById("loader").style.display = "block";
    document.getElementById("myDiv").style.display = "none";
    let cName = $("#city-name").val()

    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+ cName + "&appid=6ab72bcbc823941d15c76e4d6d3d59b0&units=metric#");
    const apiData = await response.json();
    console.log("Data", apiData);
    
  
    $("#name").text(apiData.name)
    $("#main-temp").text(apiData.main.temp)
    const icon = apiData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
    $("#image").attr("src", imageURL);
    $("#disc").text( apiData.weather[0].description)
    showPage()
    topbar.hide()
    
  })



});