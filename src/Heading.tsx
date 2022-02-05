import * as React from 'react';

// style
import './Heading.css';

// eslint-disable-next-line arrow-body-style
const Heading: React.FC = () => {
  return (
    <h1 className="heading">
      <span className="heading__highlight">github </span>
      typeahead
      <span className="heading__period">.</span>
    </h1>
  );
};

export default Heading;
