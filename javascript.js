kToF = kelvinTemp => {
	return parseInt((kelvinTemp - 273.15) * 1.8 + 32) + "℉";
};

kToC = kelvinTemp => {
	return Math.round(kelvinTemp - 273.15) + "℃";
};

capitalizeEachFirstLetterOfEachWord = str => {
	str = str.toLowerCase();
	return str
		.split(" ")
		.map(word => word.toUpperCase()[0] + word.slice(1))
		.join(" ");
};

displayToDom = (idName, data) => {
	return (document.getElementById(idName).innerHTML = data);
};

renderIconToDom = (imgName, icon) => {
	return (document.querySelector(
		`img[name="${imgName}"]`
	).src = `http://openweathermap.org/img/w/${icon}.png`);
};

addClickEvent = (idName, fahrenheitConverter, celciusConverter) => {
	document.getElementById(idName).addEventListener("click", function(event) {
		let splitIt = document.getElementById(idName).textContent.split("");
		let last = splitIt[splitIt.length - 1];
		if (last === "℉") {
			displayToDom(idName, celciusConverter);
		} else if (last === "℃") {
			displayToDom(idName, fahrenheitConverter);
		}
	});
};

displayIt = () => {
	let weatherApi = "https://weathersync.herokuapp.com/";
	fetch(`${weatherApi}ip`)
		.then(response => {
			return response.json();
		})
		.then(data => {
			city = data.city;
			country = data.country;
			latitude = data.location.latitude;
			longitude = data.location.longitude;
			fetch(`${weatherApi}weather/${latitude},${longitude}`)
				.then(response => {
					return response.json();
				})
				.then(data => {
					kelvinTemp = data.main.temp;
					condition = data.weather[0].description;
					icon = data.weather[0].icon;
					let currentConditionsFor = "Current conditions for:";
					displayToDom("locationText", currentConditionsFor);
					displayToDom("location", city);
					displayToDom("temp", kToF(kelvinTemp));
					displayToDom(
						"condition",
						capitalizeEachFirstLetterOfEachWord(condition)
					);
					renderIconToDom("icon", icon);
					addClickEvent("temp", kToF(kelvinTemp), kToC(kelvinTemp));
				});
		})
		.catch(err => {
			displayToDom(
				"location",
				`${err}. Sorry it looks like there is an error, The Application was not able to retrieve the IP address, please make sure you are connected to the internet`
			);
		});
};

displayIt();
