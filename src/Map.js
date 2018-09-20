import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import Sidebar from './Sidebar'



class Map extends React.Component {

  state = {
    infoWindowOpen : false,
    markers : this.props.markers || [],
    markerLat : '',
    markerLng : '',
    results : [],
    locations : []
  }

  toggleWindow = (e) => {
    if(e !== undefined){
      if(e.latLng.lat() !== this.markerLat && e.latLng.lng() !== this.markerLng && this.state.infoWindowOpen === true){
        this.setState({ markerLat : e.latLng.lat(),
                        markerLng : e.latLng.lng()
                      })
      }
      else if( this.state.infoWindowOpen === false ){
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
  }


  render() {
          console.log(this.state)


  	return (
  		<GoogleMap
  			defaultZoom={12}
  			defaultCenter={{lat: 47.622451, lng: -122.352033}}>
        <div id="title">Seattle Neighborhood Map</div>
  			{this.state.markers.map((marker, index) =>
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
          <Sidebar
            markers={this.state.markers}
          />
  		</GoogleMap>
  	)
  }
}

export default withGoogleMap(Map)