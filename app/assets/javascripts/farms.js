$(function (){
	if ($('.pagination').length) {
		$(window).scroll(function() {
			var url = $('.pagination span.next').children().attr('href');
			if (url && $(window).scrollTop() > $(document).height() - $(window).height() - 250) {
				$('.pagination').text('Fetching more farms...');
				return $.getScript(url)
			}
		});
	}
});

var locationChecked = false;
var map;
var markers = [];

function initializeMap() {
	var mapOptions = {
		zoom: 8,
		center: new google.maps.LatLng(43.64745269, -79.3870772),
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};

	map = new google.maps.Map($('#map-canvas')[0], mapOptions)
}

function addMarker( latitude, longitude ) {
	var myMarker = new google.maps.Marker({
		position: new google.maps.LatLng(latitude, longitude),
		map: map
	});
	markers.push(myMarker);
}

var infowindow = new google.maps.InfoWindow({
	content: ''
});

function addMarkers(coords) {
	var image = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
	coords.forEach (function(coord) {
		var myMarker = new google.maps.Marker({
			position: new google.maps.LatLng(coord.latitude, coord.longitude),
			map: map,
			icon: image
		});

		google.maps.event.addListener(myMarker, 'click', function() {
			infowindow.close();
			infowindow.setContent(content)
			infowindow.open(map,myMarker);
		});
		var content = coord.infoWindow
		markers.push(myMarker);
	});
}

function clearMarkers() {
	markers.forEach(function(marker) {
		marker.setMap(null);
	});
	markers = [];
}

function setPoly(){
	var flightPlanCoordinates =	[];
	var merchLoc = new google.maps.LatLng(farmLat, farmLong);
	polyCoords.forEach (function(polyCoord){
		var sourceLoc = new google.maps.LatLng( polyCoord.latitude, polyCoord.longitude );
		flightPlanCoordinates.push(merchLoc);
		flightPlanCoordinates.push(sourceLoc);
	});

	var flightPath = new google.maps.Polyline({
		path: flightPlanCoordinates,
		geodesic: true,
		strokeColor: '#5C832F',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	flightPath.setMap(map);
}

$(document).ready(function(){

	if ($("#map-canvas").length > 0 ) {
		initializeMap();
	}
	
	if ($("#show-page").length > 0 ) {
		clearMarkers();
		addMarker(farmLat, farmLong);
		console.log("showpage found");

		map.setCenter(new google.maps.LatLng(farmLat, farmLong));
		setPoly();
		var bounds = new google.maps.LatLngBounds();
		polyCoords.forEach(function(polyCoord) {
  	myLatLng = new google.maps.LatLng(polyCoord.latitude, polyCoord.longitude);
  	bounds.extend(myLatLng);
		});
		map.fitBounds(bounds);
		addMarkers(polyCoords);
		};


	function geolocationSuccess(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		$.ajax({
			url: "/farms",
			method: "GET",
			data: {
				latitude: latitude,
				longitude: longitude
			},
			dataType: 'script'
		});
	}

	function geolocationError(error) {
		console.log("There was an error :( ");
	}
	
	if ($("#geo-locate").length > 0) {
		if ("geolocation" in navigator) {
			console.log("geolocation running...");
			navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
			locationChecked = true;
		}else {
			alert("Get a better browser!");
		}
	}
});

$(document).ready(function() {
	if (window.tag_names) {
		$("#farm_tag_list").select2({
			tags: tag_names,
			createSearchChoice: function() { return null; },
			tokenSeparators: [",", " "],
			width: 'resolve'
		});
	}

	$(function() {
		if (window.merchant_names) {
			$("#farm_vendor_list").select2({
				data: merchant_names,
				multiple: true,
				createSearchChoice: function() { return null; },
				tokenSeparators: [",", " "],
				width: 'resolve'
			});
		}
	});
});