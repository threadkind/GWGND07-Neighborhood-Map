import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"


class Map extends React.Component {

  state = {
    infoWindowOpen : false
  }

  toggleWindow = () => {
    if( this.state.infoWindowOpen === false ){
      this.setState({ infoWindowOpen : true })
    }
    else {
      this.setState({ infoWindowOpen : false })
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
          {this.state.infoWindowOpen && <InfoWindow
              onCloseClick={this.toggleWindow}>
              <div>Hello</div>
          </InfoWindow>}

          </Marker>
  			)}
  		</GoogleMap>
  	)
  }
}

export default withGoogleMap(Map)