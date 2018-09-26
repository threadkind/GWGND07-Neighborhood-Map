import React, { Component } from 'react';
import './App.css';
import Map from './Map'

const locations = require("./locations.json");

class App extends Component {
  render() {
    return (


        <Map
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={ locations }
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDdD1vL23TBuhvIo-ud9104aJ63GihgGac&v=3&libraries=places"
        />
    );
  }
}

export default App;
