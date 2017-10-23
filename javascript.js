let weatherApi = "https://weathersync.herokuapp.com/";
let locationObj = {};
let weatherData = {};

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

const displayIt = () => {
  fetch(`${weatherApi}ip`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      locationObj.city = data.city;
      latitude = data.location.latitude;
      longitude = data.location.longitude;
      fetch(`${weatherApi}weather/${latitude},${longitude}`)
        .then(response => {
          return response.json();
        })
        .then(res => {
          weatherData.kelvinTemp = res.main.temp;
          weatherData.condition = res.weather[0].description;
          weatherData.icon = res.weather[0].icon;
          weatherData.currentConditionsFor = "CURRENT CONDITIONS FOR:";
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
        })
        .catch(err => {
          displayToDom(
            "weather",
            `${err}. Sorry it looks like there is an error, The Application was not able to retrieve the weather condition.`
          );
        });
    });
};

displayIt();
