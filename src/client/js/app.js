export function getCityName(event) {
  event.preventDefault();

  const cityResult = document.getElementById("cityName").value;
  const inputDate = document.getElementById("travelDate").value;

  if (!inputDate) {
    alert("Enter a date");
  } else if (!cityResult) {
    alert("Enter a city name");
  } else {
    fetch(`http://localhost:8081/geo?city=${cityResult}&date=${inputDate}`, {
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      // Body is not allowed for GET requests
      // body: JSON.stringify({ data: cityResult, dataDate: inputDate }),
    })
      .then(function (res) {
        try {
          return res.json();
        } catch (error) {
          console.log("error", error);
        }
      })
      .then(function (res) {
        try {
          document.getElementById(
            "entry-title"
          ).innerHTML = `<h2>Your trip to: ${res.name}, ${res.country}, ${res.flag}</h2>`;
          document.getElementById(
            "date"
          ).innerHTML = `Your trip is on: ${inputDate}`;
          document.getElementById(
            "latitud"
          ).innerHTML = `latitud: ${res.latitud}`;
          document.getElementById(
            "longitud"
          ).innerHTML = `longitud: ${res.long}`;
          document.getElementById(
            "timeZone"
          ).innerHTML = `<p>Temperature: ${res.temperature}, ${res.timezone}</p>`;
          document.getElementById(
            "city-image"
          ).innerHTML = `<img src=${res.backgroundImage} class="city-image" />`;
        } catch (error) {
          console.log("error", error);
        }
      });
  }
}
