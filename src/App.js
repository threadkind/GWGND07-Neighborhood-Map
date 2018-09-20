import React, { Component } from 'react';
import './App.css';
import Map from './Map'

class App extends Component {
  render() {
    return (

      <Map
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        markers={[{ name: "Gas Works Park", lat: 47.645949, lng: -122.335212 },
        { name: "Space Needle", lat: 47.622865, lng: -122.349420 },
        { name: "Pike Place Market", lat: 47.609474, lng: -122.341506 },
        { name: "Pinball Museum", lat: 47.598389, lng: -122.324878 },
        { name: "Fremont Troll", lat: 47.651105, lng: -122.347272 }
        ]}
      />
    );
  }
}

export default App;
