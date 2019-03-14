import React, { Component } from 'react';
import { compose, withProps,lifecycle,withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

import {geolocated} from 'react-geolocated';
 
  const MyMapComponent = compose(

    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyB4XVXifE5FJzwpQ5Ffnem8ISm6tPvom4o&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `1000px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
      boxes:[{lat:51.5219114,long:-0.0816049},{lat:52.5219114,long:-0.0216049}]
    }),
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: props.latitude, lng: props.longitude }}>
    
    {props.boxes.map((keyName, i) => (
        
            <div key={i}>
               { props.isMarkerShown && (
                  <Marker onClick={props.getDirection.bind(this,props.boxes[i].lat,props.boxes[i].long)}  position={{ lat: props.boxes[i].lat, lng: props.boxes[i].long }}>
                {props.directions!=null && <DirectionsRenderer directions={props.directions} />}
              </Marker>
                )
                }
                </div>
       ))}
        
    </GoogleMap>
  ));
class FindBoxes extends Component {
    
  constructor(props)
  {
      super(props);
      this.state=({
        directions:null
      });
        this.getDirection = this.getDirection.bind(this);
  }
  getDirection(lat,long) {   
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.coords.latitude, this.props.coords.longitude),
        destination: new google.maps.LatLng(lat, long),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
    render() {
        return !this.props.isGeolocationAvailable
      ? <div className="animated fadeIn">Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div className="animated fadeIn">Geolocation is not enabled</div>
        : this.props.coords
          ?    
          <div className="animated fadeIn">
            <MyMapComponent className="animated fadeIn" latitude={this.props.coords.latitude} longitude={this.props.coords.longitude} directions={this.state.directions} getDirection={this.getDirection} isMarkerShown />
          </div>
          : <div className="animated fadeIn">Getting the location data&hellip; </div>;
    }
}
export default geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(FindBoxes);