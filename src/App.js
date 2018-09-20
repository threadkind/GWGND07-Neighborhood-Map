import React, { Component } from 'react';
import './App.css';
import Map from './Map'

class App extends Component {
  render() {
    return (

      <Map
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default App;
