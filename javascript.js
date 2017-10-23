const kToF = (kelvinTemp) => {
  return parseInt((kelvinTemp - 273.15) * 1.8 + 32) + '℉';
};

const kToC = (kelvinTemp) => {
  return Math.round(kelvinTemp - 273.15) + '℃';
};

const capitalizeEachFirstLetterOfEachWord = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.toUpperCase()[0] + word.slice(1))
    .join(' ');
};

const displayToDom = (idName, data) => {
  return (document.getElementById(idName).innerHTML = data);
};

const renderIconToDom = (imgName, icon) => {
  return (document.querySelector(
    `img[name='${imgName}']`
  ).src = `http://openweathermap.org/img/w/${icon}.png`);
};

const addClickEvent = (idName, fahrenheitConverter, celciusConverter) => {
  document.getElementById(idName).addEventListener('click', () => {
    const splitIt = document.getElementById(idName).textContent.split('');
    const last = splitIt[splitIt.length - 1];
    if (last === '℉') {
      displayToDom(idName, celciusConverter);
    } else if (last === '℃') {
      displayToDom(idName, fahrenheitConverter);
    }
  });
};

const displayIt = () => {
  const weatherApi = 'https://weathersync.herokuapp.com/';
  fetch(`${weatherApi}ip`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const city = data.city;
      const latitude = data.location.latitude;
      const longitude = data.location.longitude;
      fetch(`${weatherApi}weather/${latitude},${longitude}`)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          const kelvinTemp = res.main.temp;
          const condition = res.weather[0].description;
          const icon = res.weather[0].icon;
          const currentConditionsFor = 'Current conditions for:';
          displayToDom('locationText', currentConditionsFor);
          displayToDom('location', city);
          displayToDom('temp', kToF(kelvinTemp));
          displayToDom(
            'condition',
            capitalizeEachFirstLetterOfEachWord(condition),
          );
          renderIconToDom('icon', icon);
          addClickEvent('temp', kToF(kelvinTemp), kToC(kelvinTemp));
        })
        .catch((err) => {
          displayToDom(
            'weather',
            `${err}. Sorry it looks like there is an error, The Application was not able to retrieve the weather condition.`
          );
        });
    })
    .catch((err) => {
      displayToDom(
        'location',
        `${err}. Sorry it looks like there is an error, The Application was not able to retrieve the IP address, please make sure you are connected to the internet`
      );
    });
};

displayIt();