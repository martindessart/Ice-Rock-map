import React from 'react';


function Tumblr(props) {
  const {selected, contenu } = props;

    return (
      <div className="tumblr-box">
        <article>
          <p> Tumblr Illustration</p>
          <h2>{selected.title}</h2>
          {contenu}
        </article>
      </div>
    );
  }

export default Tumblr
