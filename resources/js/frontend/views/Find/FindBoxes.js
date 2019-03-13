import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
const MyMapComponent = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyB4XVXifE5FJzwpQ5Ffnem8ISm6tPvom4o&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `700px` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.isMarkerShown && (
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      )}
    </GoogleMap>
  ));
export default class FindBoxes extends Component {
    
  
    render() {
        return (
            <MyMapComponent isMarkerShown />
        )
    }
}