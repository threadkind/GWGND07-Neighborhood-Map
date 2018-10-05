import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import ErrorBoundary from './ErrorBoundary'

const locations = require("./json/locations.json");

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Map
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={ locations }
        />
      </ErrorBoundary>

    );
  }
}

export default App;
