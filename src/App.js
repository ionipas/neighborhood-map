import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import './App.css';
import Header from './components/Header'
import Search from './components/Search'

class App extends Component {
  state = {
    venues: [],
    initialVenues: [],
    map: '',
    query: '',
    class: 'search-box'
  }

  realMarkers = []

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 44.43551, lng: 26.102526},
      zoom: 15,
      mapTypeControl: true,
      mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: window.google.maps.ControlPosition.TOP_CENTER
      }
    })
    this.setState({map: map})
    this.initMarkers()
  }

  initMarkers = () => {
    const defaultIcon = this.makeMarkerIcon('708ec9');
    const highlightedIcon = this.makeMarkerIcon('FFFF24');

    this.state.venues.map(item => {
      const map = this.state.map
      const marker = new window.google.maps.Marker({
        position: {lat: item.venue.location.lat, lng: item.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        icon: defaultIcon,
        id: item.venue.id
      })
      this.realMarkers.push(marker)
      const infowindow = new window.google.maps.InfoWindow({
        content: `<h3>` + item.venue.name + `</h3>` + `<p>` + item.venue.location.address + `</p>`,
      })
      marker.addListener('mouseover', function() {
        infowindow.open(map, marker)
        this.setIcon(highlightedIcon)
      })
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon)
        infowindow.close(map, marker)
      })
      return marker
    })
  }

  makeMarkerIcon = (markerColor) => {
    const markerImage = new window.google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new window.google.maps.Size(21, 34),
      new window.google.maps.Point(0, 0),
      new window.google.maps.Point(10, 34),
      new window.google.maps.Size(21,34));
    return markerImage;
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
      '&v=20190130&limit=10&ll=44.435347,26.102419')
    .then(res => res.json())
    .then(data => {
      this.setState ({
        venues: data.response.groups[0].items,
        initialVenues: data.response.groups[0].items
      })
    })
    .then(() => this.renderMap())
    .catch(err => alert("App is not responding. Please, check your network access"))
  }

  updateQuery = (query) => {
    if(query) {
      this.setState({query: query})
    } else {
      this.setState({venues: this.state.initialVenues})
      this.realMarkers.map(marker => marker.setMap(this.state.map))
      this.setState({query: ''})
    }
  }

  filterVenues = (query) => {
    if(query) {
      const word = new RegExp(escapeRegExp(this.state.query), 'i')
      const filteredList = this.state.venues.filter(item => word.test(item.venue.categories[0].name))
      this.setState ({
        venues: filteredList
      })
      this.realMarkers.map((marker) => {
        marker.setMap(null)
        return marker
      })
      if (filteredList.length === 0) {
        alert("No location found. Please, try another search.")
        return
      } else {      
        filteredList.map(item => {
          const markerToShow = this.realMarkers.filter(marker => marker.id === item.venue.id)
          markerToShow.map(item => item.setMap(this.state.map))
          return markerToShow
        })
      }
    }
  }

  handleAnimation = (place) => {
    const markerToAnimate = this.realMarkers.find((marker) => marker.id === place)
    markerToAnimate.setAnimation(null)
    markerToAnimate.setAnimation(window.google.maps.Animation.BOUNCE)
    setTimeout(function(){ markerToAnimate.setAnimation(null); }, 2100)
  }

  toggleBounce = (event) => {
    const venueId = event.target.getAttribute("data-key")
    this.handleAnimation(venueId)
  }

  toggleMenu() {
    if (this.state.class === 'search-box') {
      this.setState({ class: "search-box-hide" })
    } else {
      this.setState({ class: "search-box" })
    }
  }

  render() {
    return (
      <div className="App">
        <Search class={this.state.class} 
                query={this.state.query}
                updateQuery={this.updateQuery}
                filterVenues={this.filterVenues}
                venues={this.state.venues}
                toggleBounce={this.toggleBounce}
        />
        <button className="toggle-menu" onClick={() => this.toggleMenu()}>Search page</button>
        <div className="Map-container">
          <Header />
          <div id="map" aria-label="Google Map with a marker for each place"></div>
        </div>
      </div>
    );
  }
}

export default App;
