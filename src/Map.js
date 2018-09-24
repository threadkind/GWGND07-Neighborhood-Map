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
    locations : [],
    infoMenu : false,
    clickedListItem : [],
    clickedItem : []
  }

  viewInfoMenu = (e) => {
    this.setState({ infoMenu : true })

    let lat = e.latLng.lat().toFixed(6)
    let lng = e.latLng.lng().toFixed(6)
    console.log(lat, lng)

    let matched = (this.props.markers.filter(marker => {
      if(marker.lat.toFixed(6) === lat && marker.lng.toFixed(6) === lng){
        return marker
      }
     }))

    this.setState({ clickedItem : matched})
    console.log(matched)
  }

  closeInfoMenu = () => {
    this.setState({ infoMenu : false })
  }

  markerClick = (filteredMarkers) => {
    this.setState({ markers : filteredMarkers })
  }

  listItemClick = (listItem) => {
    console.log('back in the main app')
    this.setState({ clickedListItem : listItem})
    this.viewInfoMenu()
  }



  render() {

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
               scaledSize : {width: 30, height: 52}
               }}
            onClick={this.viewInfoMenu}
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
            listItemClick={this.listItemClick.bind(this)}
          />

          {this.state.infoMenu && <InfoMenu
            closeMenu={this.closeInfoMenu}
            item={this.state.clickedItem}
          />}

  		</GoogleMap>
  	)
  }
}

export default withGoogleMap(Map)