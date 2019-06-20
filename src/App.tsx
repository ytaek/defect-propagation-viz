import * as React from 'react';
import './App.css';
import SidePanel from './SidePanel';
import DynamicQueryAndWeight from './DynamicQueryAndWeight';
import { DataService } from './DataService';

class App extends React.Component {

  private dataService = new DataService()

  constructor(props: any){
    super(props);
  }

  public render() {
    return (
      <div className="App-container">
        <div className="App-sidebar">
          <SidePanel dataService = {this.dataService}/>
        </div>
        <div className="App-main">
          <DynamicQueryAndWeight/>
        </div>
      </div>
    );
  }
}

export default App;