let weatherApi = "https://weathersync.herokuapp.com/";
let openWeatherIcon = "http://openweathermap.org/img/w/";

fetch(`${weatherApi}ip`)
	.then(response => {
		return response.json();
	})
	.then(data => {
		city = data.city;
		country = data.country;
		latitude = data.location.latitude;
		longitude = data.location.longitude;
		displayToDom("location", city);
		fetch(`${weatherApi}weather/${latitude},${longitude}`)
			.then(response => {
				return response.json();
			})
			.then(data => {
				let kelvinTemp = data.main.temp;
				let condition = data.weather[0].description;
				displayToDom("status", kToF(kelvinTemp));
				displayToDom("condition", capitalizeEachWord(condition));
			});
	});

kToF = fahrenheitTemp => {
	return parseInt((fahrenheitTemp - 273.15) * 1.8 + 32) + "&#8457;";
};

capitalizeEachWord = str => {
	return str
		.split(" ")
		.map(word => word.toUpperCase()[0] + word.slice(1))
		.join(" ");
};

displayToDom = (className, data) => {
	return (document.getElementsByClassName(className)[0].innerHTML = data);
};
