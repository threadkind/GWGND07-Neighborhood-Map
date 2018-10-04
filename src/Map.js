import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
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
    clickedItem : []
  }

  clickedMarker = (e) => {

    let lat = e.latLng.lat().toFixed(6)
    let lng = e.latLng.lng().toFixed(6)

    let matched = (this.props.markers.filter(marker => {
      return marker.lat.toFixed(6) === lat && marker.lng.toFixed(6) === lng
     }))

    this.viewInfoMenu(matched)

  }
  viewInfoMenu = (item) => {
    let animate = this.state.markers

    for(let i = 0; i < animate.length; i++){
      if(animate[i].name === item[0].name){
        animate[i].animate = 4
      }
      else {
        animate[i].animate = 0
      }
    }

    this.setState({ infoMenu: true,
                  clickedItem : item,
                  markers : animate })
  }

  closeInfoMenu = () => {
    this.setState({ infoMenu : false })
  }

  markerClick = (filteredMarkers) => {
    this.setState({ markers : filteredMarkers })
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
            position={marker}
            icon={{ url : icon,
               scaledSize : {width: 30, height: 52}
               }}
            onClick={this.clickedMarker}
            animation={marker.animate}
          >
          </Marker>
        )}

        <Sidebar
          markers={this.props.markers}
          markerClick={this.markerClick.bind(this)}
          listItemClick={this.viewInfoMenu.bind(this)}
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