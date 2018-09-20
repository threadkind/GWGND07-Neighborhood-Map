import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"


class Map extends React.Component {

  state = {
    infoWindowOpen : false,
    markerLat : '',
    markerLng : ''
  }

  toggleWindow = (e) => {
    console.log(e.latLng.lat(), e.latLng.lng())
    if( this.state.infoWindowOpen === false ){
      this.setState({ infoWindowOpen : true,
                      markerLat : e.latLng.lat(),
                      markerLng : e.latLng.lng()
                    })
    }
    else {
      this.setState({ infoWindowOpen : false,
                      markerLat : '',
                      markerLng :''
                    })
    }
  }

  render() {
  	const markers = this.props.markers || []
  	return (

  		<GoogleMap
  			defaultZoom={10}
  			defaultCenter={{lat: 47.622451, lng: -122.352033}}>
  			{markers.map((marker, index) =>
  				<Marker
            key={index}
            position={marker}
            onClick={this.toggleWindow}
          >
          </Marker>
        )}
          {this.state.infoWindowOpen && <InfoWindow
              onCloseClick={this.toggleWindow}
              position={{lat: this.state.markerLat, lng: this.state.markerLng}}
              >
              <div>Coordinates of this location are {this.state.markerLat}, {this.state.markerLng}</div>
          </InfoWindow>}

  		</GoogleMap>
  	)
  }
}

export default withGoogleMap(Map)