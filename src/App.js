import React, { Component } from 'react';
import './App.css';
import Map from './Map'

class App extends Component {
  render() {
    return (
        <Map
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={[
            { id: 1, name: "Gas Works Park", lat: 47.645949, lng: -122.335212 },
            { id: 2, name: "MoPOP", lat: 47.621700, lng: -122.348060 },
            { id: 3, name: "Pike Place Market", lat: 47.609474, lng: -122.341506 },
            { id: 4, name: "Pink Gorilla University District", lat: 47.661023, lng: -122.313430 },
            { id: 5, name: "Fremont Troll", lat: 47.651105, lng: -122.347272 },
            { id: 6, name: "Historic Chinatown Gate", lat: 47.598464, lng: -122.327334 },
            { id: 7, name: "Bainbridge Island Ferry Terminal", lat: 47.623470, lng: -122.510863 },
            { id: 8, name: "Seattle Center Monorail Station", lat: 47.621256, lng: -122.349693 }
          ]}
        />
    );
  }
}

export default App;
