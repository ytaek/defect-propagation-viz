import React from 'react';
import DynamicQueryAndWeight from './DynamicQueryAndWeight.js'
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div id="left">
        <DynamicQueryAndWeight />
      </div>
    );
  }
}

export default App;