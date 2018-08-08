import React, {Component} from 'react';

class App extends Component {
  constructor(props){
    super(props);
  this.state = {
    map: '',
  };
}

  componentDidMount() {
    window.initMap = this.initMap;
    openGmap('https://maps.googleapis.com/maps/api/js?key=AIzaSyBjJdrQgRfSMEpE0_uW6ADz0DwPKoO_bEw&callback=initMap');
  }

  initMap = () => {

    //define variables
    var markers = [];
    var volcanoList = [];
    var volcan = document.getElementById('list');
    var styles = [
      {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ff0000"
              },
              {
                  "saturation": "0"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "saturation": "-62"
              },
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#000000"
              },
              {
                  "weight": "1.53"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape.natural.landcover",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ff0000"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      }
    ]
    var island = [
      {title: 'Eyjafjallajökull Volcano ', location: {lat: 63.63040460000001, lng: -19.606733299999973}},
      {title: 'Katla Volcano ', location: {lat: 63.6467299, lng: -19.130284699999947}},
      {title: 'Hverfjall Volcano ', location: {lat: 65.60861109999999, lng: -16.87166669999999}},
      {title: 'Kerlingarfjöll Volcano ', location: {lat: 64.6365932, lng: -19.26943959999994}},
      {title: 'Öræfajökull Volcano ', location: {lat: 63.98217380000001, lng: -16.653642799999943}},
      {title: 'Grímsnes Volcano ', location: {lat: 64.033333, lng: -20.866667000000007}},
      {title: 'Eldfell Volcano ', location: {lat: 63.4325, lng: -20.247499999999945}}
    ];
    var largeInfowindow = new window.google.maps.InfoWindow();
    //var defaultIcon = makeMarkerIcon('0091ff');
    //var highlightedIcon = makeMarkerIcon('367f39');

    // Constructor creates a new map
    let map = new window.google.maps.Map(document.getElementById('map'), {
       zoom: 6,
       center: {lat: 64.126, lng: -18.817},
       styles: styles,
       //mapTypeControl: false
     });
     this.setState({
       map
     });

    for (var i = 0; i < island.length; i++) {
      // Get the position from the location array
      var position = island[i].location;
      var title = island[i].title;

      // Create a marker per location, and put into markers array.
      var marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        //icon: defaultIcon,
        id: i
      });
      markers.push(marker);
      console.log(marker.title);
      volcanoList.push(marker.title);

      // display markers
      for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      };


      // Create an onclick event to open an infowindow at each marker.
      //marker.addListener('click', function() {
      //  populateInfoWindow(this, largeInfowindow);
      //});

      // to change the colors back and forth.
      //marker.addListener('mouseover', function() {
      //  this.setIcon(highlightedIcon);
      //});
      //marker.addListener('mouseout', function() {
      //  this.setIcon(defaultIcon);
      //});
    }


  };

  // displays content of the infoWindow
  populateInfoWindow = (marker, infowindow) => {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + marker.position + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  }



render() {
  return (
    <div className="App">
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
