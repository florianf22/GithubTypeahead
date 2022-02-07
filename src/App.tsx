import * as React from 'react';
// style
import './App.css';
// components
import TypeAhead from './TypeAhead';
import Heading from './Heading';

const App: React.FC = () => (
  <main className="main">
    <Heading />
    <TypeAhead />
  </main>
);

export default App;
