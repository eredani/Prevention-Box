import React, { Component } from 'react';
import { compose, withProps,lifecycle,withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
import {geolocated} from 'react-geolocated';
 
  const MyMapComponent = compose(

    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyB4XVXifE5FJzwpQ5Ffnem8ISm6tPvom4o&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `750px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
      boxes:[{lat:51.5219114,long:-0.0816049}]
    }),
    withStateHandlers(() => ({
        isOpen: false,
        getDir:false
      }), {
        onToggleOpen: ({ isOpen }) => () => ({
          isOpen: !isOpen,
        })
      },
      {
        onGetDir: ({ getDir }) => () => ({
            getDir: !getDir,
        })
      },
      ),
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={14} defaultCenter={{ lat: props.latitude, lng: props.longitude }}>
    {
        console.log(props.latitude)
    }
    {(props.boxes).map((keyName, i) => (
            <div key={i}>
            {!props.isOpen &&  <InfoBox 
                defaultPosition={new google.maps.LatLng(props.boxes[i].lat, props.boxes[i].long)}
                options={{ closeBoxURL: ``, enableEventPropagation: true }}
              >
                <div style={{ backgroundColor: `green`, opacity: 100, padding: `2px` }}>
                  <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                    Find Me!
                  </div>
                </div>
              </InfoBox>
            }
          
               { props.isMarkerShown && (
                  <Marker onClick={props.onToggleOpen}  position={{ lat: props.boxes[i].lat, lng: props.boxes[i].long }}>
               {props.isOpen && <InfoBox
                  onCloseClick={props.onToggleOpen}
                  options={{ closeBoxURL: ``, enableEventPropagation: true }}
                >
                  <div style={{ backgroundColor: `transparent`, opacity: 100, padding: `12px` }}>
                    <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                      <a  onClick={props.getDirection.bind(props.boxes[i].lat,props.boxes[i].long)}>Get Direction</a>
                    </div>
                  </div>
                </InfoBox>}
                {props.directions!=null && props.isOpen && <DirectionsRenderer directions={props.directions} />}
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
  getDirection(e,lat,long) {   
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
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ?    <MyMapComponent latitude={this.props.coords.latitude} longitude={this.props.coords.longitude} directions={this.state.directions} getDirection={this.getDirection} isMarkerShown />
          : <div>Getting the location data&hellip; </div>;
    }
}
export default geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(FindBoxes);