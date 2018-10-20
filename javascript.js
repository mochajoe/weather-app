const weatherApi = "https://weathersync.herokuapp.com/";
const weatherData = {};
const locationObj = {};

const kToF = kelvinTemp => {
  return parseInt((kelvinTemp - 273.15) * 1.8 + 32) + "℉";
};

const kToC = kelvinTemp => {
  return parseInt(kelvinTemp - 273.15) + "℃";
};

const capitalizeEachFirstLetterOfEachWord = str => {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.toUpperCase()[0] + word.slice(1))
    .join(" ");
};

const displayToDom = (idName, data) => {
  return (document.getElementById(idName).innerHTML = data);
};

const renderIconToDom = (imgName, icon) => {
  return (document.querySelector(
    `img[name='${imgName}']`
  ).src = `http://openweathermap.org/img/w/${icon}.png`);
};

const toggleTempUnits = (idName, fahrenheitConverter, celciusConverter) => {
  document.getElementById(idName).addEventListener("click", () => {
    checkIfForC(idName, fahrenheitConverter, celciusConverter);
  });
};

const checkIfForC = (idName, fahrenheitConverter, celciusConverter) => {
  const splitIt = document.getElementById(idName).textContent.split("");
  const last = splitIt[splitIt.length - 1];
  if (last === "℉") {
    displayToDom(idName, celciusConverter);
  } else if (last === "℃") {
    displayToDom(idName, fahrenheitConverter);
  }
};

const weatherIp = url => {
  return `${url}ip`;
};

const weatherUrl = obj => {
  return `${weatherApi}weather/${obj.latitude},${obj.longitude}`;
};

const getCity = () => {
  fetch(weatherIp(weatherApi))
    .then(response => {
      return response.json();
    })
    .then(data => {
      locationObj.city = data.city;
      locationObj.latitude = data.location.latitude;
      locationObj.longitude = data.location.longitude;
      getLocation(locationObj);
    })
    .catch(err => {
      displayToDom("weather", `Sorry it looks like there is an error`);
    });
};

const getLocation = obj => {
  fetch(weatherUrl(obj))
    .then(response => {
      return response.json();
    })
    .then(data => {
      weatherData.kelvinTemp = data.main.temp;
      weatherData.condition = data.weather[0].description;
      weatherData.icon = data.weather[0].icon;
      weatherData.city = data.weather[0].city;
      weatherData.currentConditionsFor = "CURRENT CONDITIONS FOR:";
      renderToDom(locationObj.city, weatherData);
    })
    .catch(err => {
      displayToDom(
        "weather",
        `${err}. Sorry it looks like there is an error, The Application was not able to retrieve the weather condition.`
      );
    });
};

const renderToDom = (city, weatherObj) => {
  displayToDom("locationText", weatherData.currentConditionsFor);
  displayToDom("location", locationObj.city);
  displayToDom("temp", kToF(weatherData.kelvinTemp));
  displayToDom(
    "condition",
    capitalizeEachFirstLetterOfEachWord(weatherData.condition)
  );
  renderIconToDom("icon", weatherData.icon);
  toggleTempUnits(
    "temp",
    kToF(weatherData.kelvinTemp),
    kToC(weatherData.kelvinTemp)
  );
};

const initialize = () => {
  getCity();
};

initialize();
