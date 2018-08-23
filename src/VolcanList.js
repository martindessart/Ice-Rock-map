import React, {Component} from 'react';
import * as dataVolcan from './dataVolcan.json';
import escapeRegExp from 'escape-string-regexp';

class VolcanList extends Component {
  // initialize local state
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      resultMarker: [],
      selected: {},
      resultVolcano: dataVolcan,
      listDisplay: true,
    }
  }

  componentDidMount() {
    this.setState({
      resultMarker: this.props.markers
    });
  }
  //handle query information
  updateQuery = (query) => {
    this.setState({
      query, listDisplay: true
    });
    //if nothing is written, display nothing
    if (query === '') {
      this.setState({
        listDisplay: false
      });
      }
      //call the match function
      this.handleVolcanoes(query);
  }
  //if the list is open, it closes, and vice versa
  updateList = () => {
    this.setState((prevState) => ({
      listDisplay: !(prevState.listDisplay)
    }));
  }
  //using regexp, find any answer with match the input
  handleVolcanoes = (query) => {
    let appComponent = this;
    let newMarkers;
    let newVolcano;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');

      newVolcano = this.props.volcano.filter(volcan =>
      match.test(volcan.title)
      );
      //console.log(newVolcano);
      newMarkers = this.props.markers.filter(marker =>
      match.test(marker.title)
      );
      //console.log(newMarkers);
      this.setState({
      resultMarkers: newMarkers,
      resultVolcano: newVolcano
      });
    }
    else {
      this.setState({
        resultMarker: this.props.markers,
        resultVolcano: this.props.volcano
      });
    }

    this.props.markers.map(marker => marker.setVisible(false));
    setTimeout(function() {
      appComponent.props.markers.map(marker =>
      appComponent.displayMarker(marker))
    }, 200)
  }
    //show the good marker
    displayMarker = (marker) => {
      this.state.resultMarker.map(resultMarker => resultMarker.id === marker.id && marker.setVisible(true));
    }
    //handle the marker animation and display the wikipedia page
    handleMarker = (volcan) => {
      var appComponent = this;
      this.bounceMarker(volcan);
      this.addMarker(volcan);
      setTimeout(function() {
        appComponent.props.displayIF(
          appComponent.state.selected
        );
      }, 200)
    }
    //make the marker bounce !
    bounceMarker = (volcan) => {
      var appComponent = this;
      this.state.resultMarker.map(resultMarker =>
      resultMarker.id === volcan.key && resultMarker.setAnimation(
        window.google.maps.Animation.BOUNCE)
      )
    setTimeout(function() {
      appComponent.state.resultMarker.map(resultMarker =>
      resultMarker.id === volcan.key && resultMarker.setAnimation(null)
      )
    },1600)

  }
    addMarker = (volcan) => {
      this.state.resultMarker.map(resultMarker =>
      resultMarker.id === volcan.key &&
    this.setState({
      selected: resultMarker
    })
  )
}

  render() {
    const { query, resultVolcano, listDisplay } = this.state;

    return (
      <section className="container">
        <h1>ROCKY PLACES</h1>
        <div className= "container-nav">
        <form className="container-form"
          onSubmit={(event) => event.preventDefault()}>
          <button className="container-btn"
          onClick={() => this.updateList()}>
          Volcanoes</button>
          <input className="container-input"
          type="text"
          placeholder="Ex: Hverfjall..."
          aria-labelledby="research filter"
          value={query}
          onChange={(event) => this.updateQuery(event.target.value)}
          />
        </form>
        {listDisplay &&
        <ul className="container-list">
      {
        resultVolcano.map(volcan => (
          <li
            tabIndex={0}
            role="button"
            className="container-item"
            key={volcan.key}
            onClick={() =>
              this.handleMarker(volcan)}
            onKeyPress={() =>
              this.handleMarker(volcan)}>
              {volcan.title}
            </li>
        ))
        }
      </ul>
      }
      </div>
    </section>
    )
  }
}

export default VolcanList;
