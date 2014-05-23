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
var farmMarkers = [];
var merchMarkers = [];

function initializeMap() {
	var mapOptions = {
		zoom: 8,
		center: new google.maps.LatLng(43.64745269, -79.3870772),
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};

	map = new google.maps.Map($('#map-canvas')[0], mapOptions);
}

function addMarker( latitude, longitude, num ) {
	var myMarker = new google.maps.Marker({
		position: new google.maps.LatLng(latitude, longitude),
		map: map,
		icon: icons[num]
	});
	if (num === 0) {
		farmMarkers.push(myMarker);
	} else {
		merchMarkers.push(myMarker);
	}

	return myMarker;
}

var infowindow = new google.maps.InfoWindow({
	content: ''
});

function addMarkers(coords, num) {
	var image = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
	coords.forEach (function(coord) {
		
		var myMarker = addMarker(coord.latitude, coord.longitude, num);

		google.maps.event.addListener(myMarker, 'click', function() {
			infowindow.close();
			infowindow.setContent(content);
			infowindow.open(map,myMarker);
		});
		var content = coord.infoWindow;
	});
}

function clearMarkers(markers) {
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
		strokeColor: '#B64926',
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
		clearMarkers(farmMarkers);
		clearMarkers(merchMarkers);
		addMarker(farmLat, farmLong, 0);
		console.log("showpage found");
		map.setCenter(new google.maps.LatLng(farmLat, farmLong));
	};

	if($("#merch-show").length >0 ){
		clearMarkers(farmMarkers);
		clearMarkers(merchMarkers);
		addMarker(farmLat, farmLong, 1)
		console.log("showpage found");
		map.setCenter(new google.maps.LatLng(farmLat, farmLong));
		setPoly();
		var bounds = new google.maps.LatLngBounds();
		polyCoords.forEach(function(polyCoord) {
			myLatLng = new google.maps.LatLng(polyCoord.latitude, polyCoord.longitude);
			bounds.extend(myLatLng);
		});
		map.fitBounds(bounds);
		addMarkers(polyCoords, 0);
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