let weatherApi = "https://weathersync.herokuapp.com/";
let city, latitude, longitude;

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

getCityLatitudeLongitutde = url => {
  fetch(`${url}ip`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      city = data.city;
      latitude = data.location.latitude;
      longitude = data.location.longitude;
      displayWeatherInfoToDOM(url, latitude, longitude);
    })
    .catch(err => {
      displayToDom(
        "location",
        `${err}. Sorry it looks like there is an error, The Application was not able to retrieve the IP address, please make sure you are connected to the internet`
      );
    });
};

displayWeatherInfoToDOM = (url, lat, long) => {
  fetch(`${url}weather/${lat},${long}`)
    .then(response => {
      return response.json();
    })
    .then(res => {
      const kelvinTemp = res.main.temp;
      const condition = res.weather[0].description;
      const icon = res.weather[0].icon;
      const currentConditionsFor = "CURRENT CONDITIONS FOR:";
      displayToDom("locationText", currentConditionsFor);
      displayToDom("location", city);
      displayToDom("temp", kToF(kelvinTemp));
      displayToDom("condition", capitalizeEachFirstLetterOfEachWord(condition));
      renderIconToDom("icon", icon);
      toggleTempUnits("temp", kToF(kelvinTemp), kToC(kelvinTemp));
    })
    .catch(err => {
      displayToDom(
        "weather",
        `${err}. Sorry it looks like there is an error, The Application was not able to retrieve the weather condition.`
      );
    });
};

/*
const displayIt = () => {
  fetch(`${weatherApi}ip`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      city = data.city;
      latitude = data.location.latitude;
      longitude = data.location.longitude;
      fetch(`${weatherApi}weather/${latitude},${longitude}`)
        .then(response => {
          return response.json();
        })
        .then(res => {
          const kelvinTemp = res.main.temp;
          const condition = res.weather[0].description;
          const icon = res.weather[0].icon;
          const currentConditionsFor = "CURRENT CONDITIONS FOR:";
          displayToDom("locationText", currentConditionsFor);
          displayToDom("location", city);
          displayToDom("temp", kToF(kelvinTemp));
          displayToDom(
            "condition",
            capitalizeEachFirstLetterOfEachWord(condition)
          );
          renderIconToDom("icon", icon);
          toggleTempUnits("temp", kToF(kelvinTemp), kToC(kelvinTemp));
        })
        .catch(err => {
          displayToDom(
            "weather",
            `${err}. Sorry it looks like there is an error, The Application was not able to retrieve the weather condition.`
          );
        });
    });
};

*/

getCityLatitudeLongitutde(weatherApi);
