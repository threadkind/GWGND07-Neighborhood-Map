import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"


class Map extends React.Component {


  render() {
  	const markers = this.props.markers || []
  	return (
  		<GoogleMap
  			defaultZoom={10}
  			defaultCenter={{lat: 47.622451, lng: -122.352033}}>
  			{markers.map((marker, index) =>
  				<Marker {...marker} />
  			)}
  		</GoogleMap>
  	)
  }
}

export default withGoogleMap(Map)