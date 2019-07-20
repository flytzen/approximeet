import "./css/main.css";
import { initMap, addLocationToMap } from './map';
import UserLocation from './shared/location';
import * as signalR from '@aspnet/signalr';
import axios from 'axios';

const signalRUrl = 'http://localhost:7071/api';


//initMap();

const connection = new signalR.HubConnectionBuilder()
  .withUrl(signalRUrl)
  .configureLogging(signalR.LogLevel.Debug)
  .build();

connection.start()
.then(() => {
  console.log('connected!');
  navigator.geolocation.getCurrentPosition(position => {
    console.log("got a location");
    let userLocation: UserLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      userId: "Me",
      when: new Date()
    };
    axios.post("http://localhost:7071/api/pushLocation", userLocation);
  });
})
.catch(console.error); // I think I need to handle re-connect myself

// connection.on("messageReceived", args => { console.log(args) });
connection.on("newLocation", args => { console.log(args) });



// temporary - should not run yet as we shouldn't ask the user for location permission until we need to
// // if (navigator.geolocation) {
// //   console.log("Adding my location to the map");
// //   navigator.geolocation.getCurrentPosition(position => {
// //     let userLocation: UserLocation = {
// //       lat: position.coords.latitude,
// //       lng: position.coords.longitude,
// //       userId: "Me",
// //       when: new Date()
// //     };
// //     // addLocationToMap(userLocation)

// //   })
// // };