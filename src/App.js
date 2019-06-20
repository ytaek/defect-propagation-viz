import React from 'react';
import DynamicQueryAndWeight from './DynamicQueryAndWeight.js'
import './App.css';
import { SidePanel } from './SidePanel.js';

class App extends React.Component {
  render() {
    return (
      <div class="App-container">
        <div class="App-sidebar"><SidePanel/></div>
        <div class="App-main"><DynamicQueryAndWeight/></div>
      </div>
    );
  }
}

export default App;