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
		displayToDom("location", city);
		fetch(`${weatherApi}weather/${latitude},${longitude}`)
			.then(response => {
				return response.json();
			})
			.then(data => {
				kelvinTemp = data.main.temp;
				condition = data.weather[0].description;
				icon = data.weather[0].icon;
				displayToDom("status", kToF(kelvinTemp));
				displayToDom("condition", capitalizeEachWord(condition));
				renderImageToDom("icon",icon);

			});
	});

kToF = kelvinTemp => {
	return parseInt((kelvinTemp - 273.15) * 1.8 + 32) + "&#8457;";
};

kToC = (K) => {
	return K-273.15
}


capitalizeEachWord = str => {
	return str
		.split(" ")
		.map(word => word.toUpperCase()[0] + word.slice(1))
		.join(" ");
};

displayToDom = (className, data) => {
	return (document.getElementsByClassName(className)[0].innerHTML = data);
};

renderImageToDom = (imgName, icon) => {
	return document.querySelector(`img[name="${imgName}"]`).src = `http://openweathermap.org/img/w/${icon}.png`;
}