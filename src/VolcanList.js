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

  updateList = () => {
    this.setState((prevState) => ({
      listDisplay: !(prevState.listDisplay)
    }));
  }

    handleVolcanoes = (query) => {
      let appComponent = this;
      let newMarkers;
      let newVolcano;
      if (query) {
        const match = new RegExp(escapeRegExp(query), 'i');

        newVolcano = this.props.volcano.filter(volcan =>
        match.test(volcan.title)
        );
        console.log(newVolcano);
        newMarkers = this.props.markers.filter(marker =>
        match.test(marker.title)
        );
        console.log(newMarkers);

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

    displayMarker = (marker) => {
      this.state.resultMarker.map(resultMarker => resultMarker.id === marker.id && marker.setVisible(true));
      console.log(marker);
    }

    handleMarker = (volcan) => {
      var appComponent = this;
      //animation part
      this.addMarker(volcan);
      setTimeout(function() {
        appComponent.props.displayIF(
          appComponent.state.selected
        );
      }, 200)
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
        <h1>FIND A CRAZY ROCKY PLACE</h1>

        <form className="container-form"
          onSubmit={(event) => event.preventDefault()}>

          <button className="container-btn"
          onClick={() => this.updateList()}>
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
              this.handleMarker(volcan)}>
              {volcan.title}
            </li>

        ))
        }
      </ul>
      }
    </section>
    )
  }
}

export default VolcanList;
