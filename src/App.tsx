import * as React from 'react';
import './App.css';
import DynamicQueryAndWeight from './DynamicQueryAndWeight';
import { DataService } from './DataService';
import CriterionListContainer from './containers/CriterionListContainer';

class App extends React.Component {

  private dataService = new DataService();

  constructor(props: any){
    super(props);
  }

  render() {
console.log("app", this.dataService.criteriaData);

    return (
      <div className="App-container">
        <div className="App-sidebar">
          <CriterionListContainer criteriaData={this.dataService.criteriaData}/>
        </div>
        <div className="App-main">
          <DynamicQueryAndWeight/>
        </div>
      </div>
    );
  }
}

export default App;