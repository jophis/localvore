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

function addMarkers(coords) {
	var image = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
	coords.forEach (function(coord) {
		var myMarker = new google.maps.Marker({
			position: new google.maps.LatLng(coord.latitude, coord.longitude),
			map: map,
			icon: image
		});
    console.log(coord);
		var infowindow = new google.maps.InfoWindow({
      content: coord.infoWindow
		});
	
		google.maps.event.addListener(myMarker, 'click', function() {
    	infowindow.open(map,myMarker);
 		});
		
		markers.push(myMarker);
	});
}

function clearMarkers() {
	markers.forEach(function(marker) {
		marker.setMap(null);
	});
	markers = [];
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

	}

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

	
	if (locationChecked === false) {
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