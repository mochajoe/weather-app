let weatherApi = "https://weathersync.herokuapp.com/";

let city, country, latitude, longitude;

fetch(`${weatherApi}ip`)
	.then(response => {
		return response.json();
	})
	.then(data => {
		console.log(data);
		city = data.city;
		country = data.country;
		latitude = data.location.latitude;
		longitude = data.location.longitude;
	});

document.getElementsByClassName("location");
