import React, {Component} from 'react';
import fetchJsonp from 'fetch-jsonp';
import VolcanList from './VolcanList';
import Wikipedia from './Wikipedia';
import * as dataVolcan from './dataVolcan.json';
import * as styles from './styles.json';

class App extends Component {
// initialize local state
  constructor(props) {
    super(props);
    this.state = {
      map: '',
      markers: [],
      selected:{},
      volcanoes: dataVolcan,
      infoWindowState: false,
      contenu: ''
    }
  }
  // instantiate network request
  componentDidMount() {
    window.initMap = this.initMap;
    openGmap('https://maps.googleapis.com/maps/api/js?key=AIzaSyBjJdrQgRfSMEpE0_uW6ADz0DwPKoO_bEw&callback=initMap');
  }
  //create map
  initMap = () => {
    // keep the appComponent "this"
    let appComponent = this;
    const {volcanoes, markers} = this.state;
    // constructor creates a new map
    let map = new window.google.maps.Map(document.getElementById('map'), {
       zoom: 6,
       center: {lat: 64.126, lng: -20.817},
       // from src/styles.json
       styles: styles,
       // to add relief
       mapTypeId: 'terrain',
       mapTypeControl: false
     });
     this.setState({
       map
     });
     // loop over
    for (let i = 0; i < volcanoes.length; i++) {
      // get the position from the "dataVolcan" array from json file
      let position = volcanoes[i].position;
      let title = volcanoes[i].title;
      let id = volcanoes[i].key;
      // one marker per location, and put into markers array
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: id
      });
      markers.push(marker);
      // create a click event to open the wikipedia page when click on the appropriate marker
      marker.addListener('click', function () {
        appComponent.displayIF(marker);
      })
    } //for loop end
      //create a click event that close the wikipedia page when click anywhere on the map
      map.addListener('click', function () {
        appComponent.closeIF();
      });
  }; //init map end
  //open wikipedia page and send info to wikipediaInfo function
  displayIF = (marker) => {
    this.setState({
      infoWindowState: true,
      selected: marker
    });
    this.wikipediaInfo(marker);
  }
  //close the wikipedia page
  closeIF = () => {
    this.setState({
      infoWindowState:false,
      selected: {}
    });
  }
  //fetch info from wikipedia
  wikipediaInfo = (marker) => {
    let appComponent = this;
    let location = marker.title;
    //console.log(location);
    //create the source and add the name of the volcano
    let source =      'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' +
    location;
    //fetch the response under the format json
    fetchJsonp(source).then(function(resp) {
      return resp.json();
    }).then(function(data) {
      //extract the content
      let pages = data.query.pages;
      let pageId = Object.keys(data.query.pages)[0];
      let pageContent = pages[pageId].extract;
      appComponent.setState({
       contenu: pageContent
     });
   }).catch(function(err) {
     //handle error
     let pageError = 'nothing fetched' + err;
     appComponent.setState({
       contenu: pageError
     });
   });
  }

  render() {
    return (
      <div className="App">
        <section className="list-section">
        <VolcanList
          volcano={this.state.volcanoes}
          markers={this.state.markers}
          displayIF={this.displayIF}
          />
        {this.state.infoWindowState &&
        <Wikipedia
        selected={this.state.selected}
        contenu={this.state.contenu}
        />
    }
    </section>
        <div id="map" role="application"></div>
        </div>
      )
    }
  }

function openGmap(source) {
  var ref = window.document.getElementsByTagName('script')[0];
  var script= window.document.createElement('script');
  script.src = source;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

export default App
