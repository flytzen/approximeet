import "./css/main.css";
import { initMap, addLocationToMap } from './map';
import UserLocation from './shared/location';


initMap();

// temporary - should not run yet as we shouldn't ask the user for location permission until we need to
if (navigator.geolocation) {
  console.log("Adding my location to the map");
  navigator.geolocation.getCurrentPosition(position => {
    let userLocation: UserLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      userId: "Me",
      when: new Date()
    };
    addLocationToMap(userLocation)
  })
};