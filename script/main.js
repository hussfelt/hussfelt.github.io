// Set the styles
var styles = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]}];
function showGoogleMaps() {
 
    var hotelLatLong = new google.maps.LatLng(56.800972, 16.588751);
    var buspickupLatLong = new google.maps.LatLng(59.342847, 18.110395);
 
    var mapOptions = {
        zoom: 8,
        scaleControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: hotelLatLong,
        styles: styles
    };
 
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
 
    // Hotel
    var hotel = new google.maps.Marker({
        position: hotelLatLong,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        title: "Hotel"
    });

    // Bus pickup
    var buspickup = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "Bus pickup"
    });
}
 
google.maps.event.addDomListener(window, 'load', showGoogleMaps);