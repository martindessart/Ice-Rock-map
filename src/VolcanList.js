import React, {Component} from 'react';

class VolcanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
  }


  render() {

    return (
      <div className="container">
        <div className="options-box">
        <h1>FIND A CRAZY ROCKY PLACE</h1>
        </div>
        <div>
          <span className="list-text"> Search for an icelandic volcano !</span>
          <ol id="list"> List of volcanoes</ol>
        </div>
      </div>

    )
  }
}

export default VolcanList
