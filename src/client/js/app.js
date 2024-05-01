export function getCityName(event) {
  event.preventDefault();

  const cityResult = document.getElementById("cityName").value;
  // const inputDate = document.getElementById("travelDate").value;

  // const reverseDate = inputDate.split("-").reverse().join("-");

  if (!cityResult) {
    alert("Enter a city name");
  } else {
    fetch(`http://localhost:8081/geo?city=${cityResult}`, {
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
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
          ).innerHTML = `<h2>The weather in: ${res.name}, ${res.country}, ${res.flag}</h2>`;

          const day = res.date.map((day) => {
            const reserveDate = day.split("-").reverse().join("-");
            return `<button type="button">${reserveDate}</button>`;
          });
          document.getElementById(
            "date"
          ).innerHTML = `<p>Choose a date:</p> </br> ${day} `;

          document.getElementById(
            "latitud"
          ).innerHTML = `latitud: ${res.latitud}`;

          const temp = res.temperature.map((day) => {
            return `<p>${day}°C</p>`;
          });

          document.getElementById(
            "longitud"
          ).innerHTML = `longitud: ${res.long}`;
          document.getElementById(
            "timeZone"
          ).innerHTML = `<p>Temperature: ${temp}</p>`;
          document.getElementById(
            "city-image"
          ).innerHTML = `<img src=${res.backgroundImage} class="city-image" />`;
        } catch (error) {
          console.log("error", error);
        }
      });
  }
}
