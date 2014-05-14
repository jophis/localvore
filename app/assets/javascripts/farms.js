$(document).ready(function(){
	var latitude;
	var longitude;

	function geolocationSuccess(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		console.log(latitude + " " + longitude);
	}

	function geolocationError(error) {
		console.log("There was an error :( ");
	}

	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
	} else {
		alert("Get a better browser!");
	}

	$("#search-form").submit( function(event) {
		event.preventDefault();
		data = $(this).serialize() + "&latitude=" + latitude + "&longitude=" + longitude;

		$.ajax({
			url: "/farms",
			data: data,
			dataType: "script",
			method: "GET"
		});

	});

});