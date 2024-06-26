var path = require("path");
const express = require("express");
require("dotenv").config();
const fetch = require("node-fetch");

const geoUser = process.env.GEO_API_USER;
const weatherKey = process.env.WEATHER_API_KEY;
const pixaKey = process.env.PIXABAY_API_KEY;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("dist"));

app.get("/", function (req, res) {
  // res.sendFile("dist/index.html");
  res.sendFile(path.resolve("dist/index.html"));
});

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/geo", async function (req, res) {
  const city = req.query.city;
  // const date = req.query.date;
  try {
    const mainUrl = await fetch(
      `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoUser}`
    );
    const data = await mainUrl.json();

    const weatherResponse = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}&key=${weatherKey}`
    );
    const weatherbitForecasts = await weatherResponse.json();
    const getDays = weatherbitForecasts.data.map((day) => {
      return day.valid_date;
    });

    const showDays = getDays.map((day) => {
      return day;
    });

    const getTemp = weatherbitForecasts.data.map((day) => {
      return day.temp;
    });

    console.log(showDays);
    // const weatherData = weatherbitForecasts.data;

    const imageResponse = await fetch(
      `https://pixabay.com/api/?key=${pixaKey}&q=${city}&image_type=photo`
    );
    const imageData = await imageResponse.json();

    const flagResponse = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${data.geonames[0].countryCode}`
    );
    const flagData = await flagResponse.json();

    const cityData = {
      latitud: data.geonames[0].lat,
      long: data.geonames[0].lng,
      name: data.geonames[0].name,
      country: data.geonames[0].countryName,
      temperature: getTemp,
      backgroundImage: imageData.hits[0].largeImageURL,
      flag: flagData[0].flag,
      date: showDays,
    };

    res.send(cityData);
  } catch (error) {
    console.log("error", error);
  }
});
