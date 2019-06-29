import "./css/main.css";
import {} from 'googlemaps';

const googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBjUrTWAgKu6j_jhC3flP8S_TRXoaBPckU";
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
    var map, infoWindow;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;
}

addMapsScript();