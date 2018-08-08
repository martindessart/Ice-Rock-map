import React, {Component} from 'react';

class App extends Component {

componentDidMount() {
  window.initMap = this.initMap;
  openGmap('https://maps.googleapis.com/maps/api/js?key=AIzaSyBjJdrQgRfSMEpE0_uW6ADz0DwPKoO_bEw&callback=initMap');
}




  initMap = () => {

    //define variables
    var map;
    var markers = [];
    var volcanoList = [];
    var volcan = document.getElementById('list');


    // Constructor creates a new map
    map = new window.google.maps.Map(document.getElementById('map'), {
       zoom: 6,
       center: {lat: 64.126, lng: -18.817},
       //styles: styles,
       //mapTypeControl: false
     });
     var island = [
       {title: 'Eyjafjallajökull Volcano ', location: {lat: 63.63040460000001, lng: -19.606733299999973}},
       {title: 'Katla Volcano ', location: {lat: 63.6467299, lng: -19.130284699999947}},
       {title: 'Hverfjall Volcano ', location: {lat: 65.60861109999999, lng: -16.87166669999999}},
       {title: 'Kerlingarfjöll Volcano ', location: {lat: 64.6365932, lng: -19.26943959999994}},
       {title: 'Öræfajökull Volcano ', location: {lat: 63.98217380000001, lng: -16.653642799999943}},
       {title: 'Grímsnes Volcano ', location: {lat: 64.033333, lng: -20.866667000000007}},
       {title: 'Eldfell Volcano ', location: {lat: 63.4325, lng: -20.247499999999945}}
     ];

  }








render() {
  return (
    <div className="App">
      <div id="map" role="application"></div>

    </div>
  )
}
}

export default App

function openGmap(src) {
  var ref = window.document.getElementsByTagName('script')[0];
  var script= window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}
