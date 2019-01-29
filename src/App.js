import React, { Component } from 'react';
import './App.css';

class App extends Component {

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 44.43551, lng: 26.102526},
      zoom: 13
    })
  }

  renderMap = () => {
    const apiKey = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCNg9Wo4pmCaqkIVN4VXv7IlEQXOMbLitM&v=3&callback=initMap"

    const script = window.document.createElement('script')
    const index = window.document.getElementsByTagName('script')[0]
    script.async = true
    script.defer = true
    script.src = apiKey
    index.parentNode.insertBefore(script, index)
    window.initMap = this.initMap
  }

  componentDidMount() {
    this.renderMap()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Bucharest, Romania Map
          </p>
        </header>
        <div id="map"></div>
      </div>
    );
  }
}

export default App;
