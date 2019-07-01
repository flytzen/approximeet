import "./css/main.css";
import {} from 'googlemaps';

// I think I can just put all of these in another file and  only export the relevant bits
// Wonder if that will make the variables private? though they should just be passed, doh!
// I'll then just need to expose a method to start showing the map and another to show other people
const googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBjUrTWAgKu6j_jhC3flP8S_TRXoaBPckU";
var map, infoWindow;

function addMapsScript() {
    if (!document.querySelectorAll(`[src="${googleMapsUrl}"]`).length) { 
      document.body.appendChild(Object.assign(
        document.createElement('script'), {
          type: 'text/javascript',
          src: googleMapsUrl,
          onload: () => doMapInitLogic()
        }));
    } else {
      this.doMapInitLogic();
    }
  };

function doMapInitLogic() {
    console.log("in doMapInitLogic");
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;
    showMeOnTheMap();
}

function showMeOnTheMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          let marker = new google.maps.Marker({
              position: pos,
              label : "Bobby",
              map: map              
          })
        //   infoWindow.setPosition(pos);
        //   infoWindow.setContent('Location found.');
        //   infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

addMapsScript();