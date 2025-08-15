const cityInput = document.getElementById("cityInput");
const getWeatherButton = document.getElementById("getWeatherButton");
const weatherResult = document.getElementById("weatherResult");

getWeatherButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Molim te unesi naziv grada.");
    return;
  }

  fetch(`/weather?city=${encodeURIComponent(city)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Grad nije pronadjen");
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        weatherResult.textContent = data.error;
      } else {
        weatherResult.innerHTML = `
        <h2>Vreme za ${data.name}, ${data.country}</h2>
        <p>Temperatura: ${data.temp}°C</p>
        <p>Opis: ${data.description}</p>
        <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.description}">
      `;
      }
    })
    .catch((error) => {
      weatherResult.textContent = error.message;
    });
});
