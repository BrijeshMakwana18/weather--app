let API_KEY = "b0500e9ff7224080b1c180531221607";

function onSearch() {
  let error = document.getElementById("city-error");
  let cityName = document.getElementById("search").value;
  let preApp = document.getElementById("container");
  let weatherContainer = document.getElementById("weather-container");
  let location = document.getElementById("location");
  let temp = document.getElementById("temp");
  let wind = document.getElementById("wind");
  let pre = document.getElementById("pre");
  let weatherImg = document.getElementById("weather-img");
  let env = document.getElementById("env");
  let last = document.getElementById("last");
  if (!cityName) {
    error.innerHTML = "Please enter city name";
  } else {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=4&aqi=no&alerts=no
      `
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        if (data?.error) {
          error.innerHTML = data?.error?.message || "Something went wrong";
        } else {
          let { condition, last_updated, pressure_mb, temp_c, wind_mph } =
            data.current;
          let { name, region } = data.location;
          weatherContainer.style.display = "flex";
          preApp.style.display = "none";
          error.innerHTML = "";
          location.innerHTML = `${name}, ${region}`;
          temp.innerHTML = `${temp_c} °C`;
          weatherImg.src = `http:${condition.icon}`;
          pre.innerHTML = `${pressure_mb} mb`;
          wind.innerHTML = `${wind_mph} mph`;
          env.innerHTML = condition.text;
          last.innerHTML = `Last updateed ${last_updated}`;
        }
      });
  }
}

function goBack() {
  let preApp = document.getElementById("container");
  let weatherContainer = document.getElementById("weather-container");
  weatherContainer.style.display = "none";
  preApp.style.display = "flex";
}
