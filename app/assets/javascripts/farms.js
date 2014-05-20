$(function (){
	if ($('.pagination').length) {
		$(window).scroll(function() {
			var url = $('.pagination span.next').children().attr('href');
			if (url && $(window).scrollTop() > $(document).height() - $(window).height() - 200) {
				$('.pagination').text('Fetching more farms...');
				return $.getScript(url)
			}
		});
	}
});

var map;
var markers = [];

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
	function geolocationSuccess(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		if ($("#map-canvas").length > 0 ) {
			initializeMap( latitude, longitude );
		if (coords.length > 0) {
			addMarkers(coords);
		}
	}

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

	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
	}else {
		alert("Get a better browser!");
	};
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
	})
});