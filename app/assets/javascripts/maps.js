// var locationChecked = false;
var map;
var farmMarkers = [];
var merchMarkers = [];
var mapStyle =[];

function initializeMap() {
	var mapOptions = {
		zoom: 8,
		center: new google.maps.LatLng(43.64745269, -79.3870772),
		mapTypeId: google.maps.MapTypeId.TERRAIN,
		styles: mapStyle
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

function addCircle(latitude, longitude){
    var circleOptions = {
      strokeColor: '#468966',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#468966',
      fillOpacity: 0.2,
      map: map,
      center: new google.maps.LatLng(latitude, longitude),
      radius: 100000
    };	
  console.log("trying to add circle");
	var radCircle = new google.maps.Circle(circleOptions);
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

// function avgTravel (){
// 	var distanceSum;
// 	var merchLoc = new google.maps.LatLng(farmLat, farmLong);
// 	polyCoords.forEach (function(polyCoord){
// 		var sourceLoc = new google.maps.LatLng( polyCoord.latitude, polyCoord.longitude )
// 		computeDistanceBetween(merchLoc, sourceLoc);



// 	})
// }

$(document).ready(function(){

	if ($("#map-canvas").length > 0 ) {
		initializeMap();
	}
	
	if ($("#farm-index").length > 0 ) {
		addMarkers(farms_coords, 0);
	};

	if ($("#merch-index").length > 0 ) {
		addMarkers(merch_coords, 1);
	};


	if ($("#show-page").length > 0 ) {
		addMarker(farmLat, farmLong, 0);
		console.log("showpage found");
		map.setCenter(new google.maps.LatLng(farmLat, farmLong));
	};

	if($("#merch-show").length >0 ){
		clearMarkers(farmMarkers);
		clearMarkers(merchMarkers);
		addMarker(farmLat, farmLong, 1);
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
		addCircle(farmLat, farmLong);
	};


	function geolocationSuccess(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		map.setCenter(new google.maps.LatLng(latitude, longitude));
		map.setZoom(10);


		// $.ajax({
		// 	url: "/farms",
		// 	method: "GET",
		// 	data: {
		// 		latitude: latitude,
		// 		longitude: longitude
		// 	},
		// 	dataType: 'script'
		// });

		// $.ajax({
		// 	url:"/merchants",
		// 	method: "GET",
		// 	data: {
		// 		latitude: latitude,
		// 		logitude: longitude
		// 	},
		// 	dataType: 'script'
		// });
	}

	function geolocationError(error) {
		console.log("There was an error :( ");
	}
	
	if ($("#geo-locate").length > 0) {
		if ("geolocation" in navigator) {
			console.log("geolocation running...");
			navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
			window.locationChecked = true;
		}else {
			alert("Get a better browser!");
		}
	}


	$("#farms-checkbox").change(function() {
		if (this.checked) {
			addMarkers(farms_coords, 0);
		} else {
			clearMarkers(farmMarkers)
		}
	});

	$("#merchants-checkbox").change(function() {
		if (this.checked) {
			addMarkers(merch_coords, 1);
		} else {
			clearMarkers(merchMarkers)
		}
	});

	 // $('#search-form').submit(function(event) {
  //   event.preventDefault();
  //   var searchValue = $('#search').val();

  //   $.getScript('/tags/' + searchValue);
  //   clearMarkers(farmMarkers)
  //   clearMarkers(merchMarkers)
  // });
});