import React, {Component} from 'react';
import * as volcanoes from './volcanoes.json';
import escapeRegExp from 'escape-string-regexp';

class VolcanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      resultMarker: [],
      selected: {},
      resultVolcano: volcanoes,
      listDisplay: true,
    }
  }

  componentDidMount() {
    this.setState({
      resultMarker: this.props.markers
    });
  }

  updateQuery = (query) => {
    this.setState({
      query, listDisplay: true
    });

    if (query === '') {
      this.setState({
        listDisplay: false
      });
      }
      this.handleVolcanoes(query);
  }

    handleVolcanoes = (query) => {
      let newMarkers;
      let newVolcano;
      if (query) {
        const match = new RegExp(escapeRegExp(query), 'i');

        newVolcano = this.props.volcano.filter(volcan =>
        match.test(volcan.title)
        );
        newMarkers = this.props.markers.filter(marker =>
        match.test(marker.title)
        );
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
        this.props.markers.map(marker =>
        this.handleMarker(marker))
      }, 200)
    }

    handleMarker = (marker) => {
      this.state.resultMarker.map(resultMarker => resultMarker.id === marker.id && marker.setVisible(true))
    }

    changeListState = () => {
      this.setState((prevState) => ({
        listDisplay: !(prevState.listDisplay)
      })
    );
    };

  render() {
    const { query, resultVolcano, listDisplay } = this.state;

    return (
      <div className="container">
        <h1>FIND A CRAZY ROCKY PLACE</h1>

        <form className="container-form">

          <button className="container-btn"
          onClick={() => this.changeListState()}>
          Volcanoes</button>

          <input className="container-input"
          type="text"
          placeholder="Ex: Hverfjall..."
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
              console.log("yahayah")} >
              {volcan.title}
            </li>

        ))
        }
      </ul>
      }
      </div>
    )
  }
}

export default VolcanList;
