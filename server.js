require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
// express aplikacija
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error("Nedostaje API_KEY u .env fajlu.");
  process.exit(1);
}
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ruta /weather

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "Nedostaje parametar 'city'" });
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
          lang: "en",
        },
      }
    );

    const data = response.data;

    const result = {
      name: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };

    res.json(result);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "Grad nije pronadjen" });
    } else {
      res.status(500).json({ error: "Greska prilikom dohvatanja podataka" });
    }
  }
});
//pokretanje servera
app.listen(PORT, () => {
  console.log(`Server je pokrenut na http://localhost:${PORT}`);
});
