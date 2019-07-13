import {} from 'googlemaps';
import UserLocation from './shared/location';

const googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBjUrTWAgKu6j_jhC3flP8S_TRXoaBPckU";
let map : google.maps.Map;

interface MappedLocation {
    location: UserLocation,
    marker?: google.maps.Marker
};

let mappedLocations: MappedLocation[] = [];

const initMap = function() {
    console.log("Initialising map");
    if (!document.querySelectorAll(`[src="${googleMapsUrl}"]`).length) { 
      document.body.appendChild(Object.assign(
        document.createElement('script'), {
          type: 'text/javascript',
          src: googleMapsUrl,
          onload: () => postMapLoadInit()
        }));
    } else {
      this.postMapLoadInit();
    }
  };

const postMapLoadInit = function() {
    console.log("in doMapInitLogic");
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng:0},
        zoom: 1
    });

    mappedLocations.forEach(addUpdateMapMarker);
}

const addUpdateMapMarker = function(mappedLocation: MappedLocation){
    if (!map) {
        console.warn("addUpdateMapMarker was called before the map was initialised - that is not suppose to happen");
        return;
    }
    let pos: google.maps.ReadonlyLatLngLiteral = {
        lat: mappedLocation.location.lat,
        lng: mappedLocation.location.lng
    };

    if (mappedLocation.marker) {
        mappedLocation.marker.setPosition(pos);
    } else
        mappedLocation.marker = new google.maps.Marker({
        position: pos,
        label: mappedLocation.location.userId,
        map: map
    });

    map.panTo(pos); // Change to use bounds
    map.setZoom(6); // Change to relate to bounds
}

const addLocationToMap = function(location: UserLocation) {
    // TODO: how to handle "me" versus "others"?
    let mappedLocation = mappedLocations.find(element => element.location.userId == location.userId);
    if (!mappedLocation) {
        mappedLocation = {
            location: location
        };
        
        mappedLocations.push(mappedLocation);
    };

    if (map) {
        addUpdateMapMarker(mappedLocation);
    }
}


export { 
    initMap,
    addLocationToMap
};