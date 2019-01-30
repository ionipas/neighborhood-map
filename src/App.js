import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    venues: []
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 44.43551, lng: 26.102526},
      zoom: 13,
      mapTypeControl: true,
      mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: window.google.maps.ControlPosition.TOP_CENTER
      }
    })

    this.state.venues.map(item => {
      const marker = new window.google.maps.Marker({
        position: {lat: item.venue.location.lat, lng: item.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP
      })
      const infowindow = new window.google.maps.InfoWindow({
        content: `<h3>` + item.venue.name + `</h3>` + `<p>` + item.venue.location.address + `</p>`
      })
      marker.addListener('click', function() {
        infowindow.open(map, marker)
      })
      return marker
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
    this.exploreVenues()
  }

  exploreVenues() {
    fetch('https://api.foursquare.com/v2/venues/explore?' +
      'client_id=AFQH0HM2AZBJP3FGVHJMVXL3RMMGWNPEPVVEXCUOJUG1HRA0' +
      '&client_secret=O4I2FW3K3SCFYTBD2YJZGIUCF2D4JIXKF45VKGSDLSPB1WNT'+
      '&v=20190130&limit=10&ll=44.435347,26.102419&query=coffee')
    .then(res => res.json())
    .then(data => {
      this.setState ({
        venues: data.response.groups[0].items
      })
    })
    .then(() => this.renderMap())
    .catch(err => console.log(err))
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
