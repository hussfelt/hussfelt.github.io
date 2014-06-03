// Set the styles
var WeddingClass = {
    // Set map styles
    styles: [{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]}],

    // Set positions
    latLngs: {
        hotelLatLong: null,
        busPickupLatLong: null,
        borgholmsCastleLatLong: null,
    },

    // Default map-options
    mapOptions: {
        zoom: 12,
        scaleControl: true,
        mapTypeId: null,
        center: null,
    },

    markers: {
        hotel: null,
        buspickup: null,
        wedding: null,
    },

    // The map
    map: null,

    // Directions
    directionsDisplay: null,
    directionsService: null,

    // Initialize function
    initialize: function() {
        // Set latLngs
        this.latLngs.hotelLatLong = new google.maps.LatLng(56.800972, 16.588751);
        this.latLngs.busPickupLatLong = new google.maps.LatLng(59.330124, 18.058037);
        this.latLngs.borgholmsCastleLatLong = new google.maps.LatLng(56.870638, 16.646144);

        // Set center
        this.mapOptions.center = this.latLngs.borgholmsCastleLatLong;

        // Set styles
        this.mapOptions.styles = this.styles;

        // Set map.type
        this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;

        // Draw map
        this.map = new google.maps.Map(document.getElementById('map'), this.mapOptions);

        // Setup directionsService
        this.directionsService = new google.maps.DirectionsService();

        // Setup directionsDisplay
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        // Add map
        this.directionsDisplay.setMap(this.map);

        // Drop markers
        this.dropMarkers();
    },

    // Drop markers
    dropMarkers: function () {

        // Hotel marker
        this.markers.hotel = new google.maps.Marker({
            position: this.latLngs.hotelLatLong,
            map: this.map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            title: "Hotel"
        });

        // Bus pickup
        this.markers.buspickup = new google.maps.Marker({
            position: this.latLngs.busPickupLatLong,
            map: this.map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            title: "Bus pickup"
        });

        // Wedding-place
        this.markers.wedding = new google.maps.Marker({
            position: this.latLngs.borgholmsCastleLatLong,
            map: this.map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            title: "Bus pickup"
        });
    },

    // Calculate route from hotel to wedding
    calcualteRouteWedding: function () {

        // Setup request
        var request = {
            origin: this.latLngs.hotelLatLong,
            destination: this.latLngs.borgholmsCastleLatLong,
            travelMode: google.maps.TravelMode.DRIVING
        };

        // Setup service
        _this = this;
        this.directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                _this.directionsDisplay.setDirections(response);
            }
        });
    }

};

// When document is ready, run map
$( document ).ready(function() {

    // Hide
    $('#schema').slideUp(0);
    $('#hotels').slideUp(0);
    $('#bookBus').slideUp(0);

    // Show
    $('#showSchema').click(function() {
        $('#schema').slideToggle("fast");
    });
    $('#showHotels').click(function() {
        $('#hotels').slideToggle("fast");
    });
    $('#showBookBus').click(function() {
        $('#bookBus').slideToggle("fast");
    });

    // Initialize the map
    WeddingClass.initialize();

    // When clicking fridayBus
    $('#fridayBus').click(function(){
        // Zoom out
        WeddingClass.map.setZoom(7);
        // Move to marker after 300 ms
        setTimeout("WeddingClass.map.panTo(WeddingClass.markers.buspickup.getPosition())", 300);
        // Start zooming in
        setTimeout("WeddingClass.map.setZoom(9)", 600);
        setTimeout("WeddingClass.map.setZoom(10)", 900);
        setTimeout("WeddingClass.map.setZoom(12)", 1200);
    });

    // When clicking saturdayWelcome
    $('#saturdayWelcome').click(function(){
        // Zoom out
        WeddingClass.map.setZoom(7);
        // Move to marker after 300 ms
        setTimeout("WeddingClass.map.panTo(WeddingClass.markers.hotel.getPosition())", 300);
        // Start zooming in
        setTimeout("WeddingClass.map.setZoom(9)", 600);
        setTimeout("WeddingClass.map.setZoom(10)", 900);
        setTimeout("WeddingClass.map.setZoom(12)", 1200);
    });

    // When clicking saturdayWelcome
    $('#roadToCastle').click(function(){
        // Zoom out
        WeddingClass.map.setZoom(7);
        // Move to marker after 300 ms
        WeddingClass.calcualteRouteWedding();
        setTimeout("WeddingClass.map.panTo(WeddingClass.markers.hotel.getPosition())", 300);
        setTimeout("WeddingClass.map.setZoom(9)", 600);
        setTimeout("WeddingClass.map.setZoom(10)", 900);
    });
});