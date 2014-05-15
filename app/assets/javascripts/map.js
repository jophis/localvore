var map;

function initializeMap() {
	var mapOptions = {
		zoom: 14,
		center: new google.maps.LatLng(43.6425662, -79.3870568),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	map = new google.maps.Map($('#map-canvas')[0], mapOptions)


}
$(document).ready(function(){
	if ($('#map-canvas').length > 0) initializeMap();
})