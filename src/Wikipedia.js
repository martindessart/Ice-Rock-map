import React from 'react';


function Wikipedia(props) {
  const {selected, contenu } = props;

    return (
      <div className="wikipedia-box">
        <aside>
          <p className="wikipedia-title"> Wikipedia Illustration</p>
          <h2 className="wikipedia-volcan">{selected.title}</h2>
          {contenu}
        </aside>
      </div>
    );
  }

export default Wikipedia
