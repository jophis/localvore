var map;
var markers = [];
var coords = [];
var flightPath; 

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

function setPoly(){
	var flightPlanCoordinates =	[];
	var index
	for (index = 0; index < polyCoords.length; ++index){
		flightPlanCoordinates.push(latitude, longitude)
		flightPlanCoordinates.push(polyCoords.latitude, polyCoords.longitude)
	};
	var flightPath = new google.maps.Polyline({
		path: flightPlanCoordinates,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	flightPath.setMap(map);
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
	setPoly();
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

$(document).ready(function() {
	$("#farm_tag_list").select2({
		tags: tags,
		createSearchChoice: function() { return null; },
		tokenSeparators: [",", " "],
		width: 'resolve'
	});
});

$(document).ready(function() {
	$("#farm_vendor_list").select2({
		data: merchant_names,
		multiple: true,
		createSearchChoice: function() { return null; },
		tokenSeparators: [",", " "],
		width: 'resolve'
	});
});