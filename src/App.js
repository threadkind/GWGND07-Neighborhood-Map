import React, { Component } from 'react';
import './App.css';
import Map from './Map'

class App extends Component {
  render() {
    return (

      <Map
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        markers={[{ lat: 47.645949, lng: -122.335212 },
        { lat: 47.622865, lng: -122.349420 },
        { lat: 47.609474, lng: -122.341506 },
        { lat: 47.598389, lng: -122.324878 },
        { lat: 47.651105, lng: -122.347272 }
        ]}
      />
    );
  }
}

export default App;
