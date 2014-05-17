var map;
var markers = [];
var coords = [];

function initializeMap(latitude, longitude) {
	var mapOptions = {
		zoom: 8,
		center: new google.maps.LatLng(latitude, longitude),
		mapTypeId: google.maps.MapTypeId.TERRAIN
	}

	map = new google.maps.Map($('#map-canvas')[0], mapOptions)
}

	function addMarker( latitude, longitude ) {
		var myMarker = new google.maps.Marker({
			position: new google.maps.LatLng(latitude, longitude),
			map: map
		});
	}

	function addMarkers(coords) {
		var image = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
		coords.forEach (function(coord) {
			var myMarker = new google.maps.Marker({
				position: new google.maps.LatLng(coord.latitude, coord.longitude),
				map: map,
				icon: image
			});
		});
	}

$(document).ready(function(){
	var latitude = 0.0;
	var longitude = 0.0;
	var coords = window.coords;
	var centerLat = window.latitude;
	var centerLng = window.longitude;
  
  if($("#map-canvas").length ){
	initializeMap( centerLat, centerLng );
	// addMarker(centerLat, centerLng);
	addMarkers(coords);
	}


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
	} 
	else {
		alert("Get a better browser!");
	};

});

$(function (){
	if ($('.pagination').length) {
		$(window).scroll(function() {
			var url = $('.pagination span.next').children().attr('href');
			if (url && $(window).scrollTop() > $(document).height() - $(window).height() - 150) {
				$('.pagination').text('Fetching more farms...');
				return $.getScript(url)
			}
		});
	}
});