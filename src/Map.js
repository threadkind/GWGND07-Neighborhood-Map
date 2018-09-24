import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import TitleBanner from './TitleBanner'
import Sidebar from './Sidebar'
import InfoMenu from './InfoMenu'

const mapStyles = require("./map-styles.json");
const icon = require("./marker.svg");



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

  markerClick = (filteredMarkers) => {
    console.log(this)
    console.log(filteredMarkers)
    this.setState({ markers : filteredMarkers })
  }


  render() {
          console.log(this.state)


  	return (
  		<GoogleMap
  			defaultZoom={10}
  			defaultCenter={{lat: 47.622451, lng: -122.352033}}
        defaultOptions={{ styles: mapStyles }}
        >

        <TitleBanner />


  			{this.state.markers.map((marker) =>
  				<Marker
            key={marker.id}
            id={`m${marker.id}`}
            position={marker}
            icon={{ url : icon,
               scaledSize : {width: 20, height: 32}
               }}
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
            markers={this.props.markers}
            markerClick={this.markerClick.bind(this)}
          />

          <InfoMenu />
  		</GoogleMap>
  	)
  }
}

export default withGoogleMap(Map)