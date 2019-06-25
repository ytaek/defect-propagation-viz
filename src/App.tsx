import * as React from 'react';
import './App.css';
import { DataService, ProjectInterface } from './DataService';
import CriterionListContainer from './containers/CriterionListContainer';
import ProjectListContainer from './containers/ProjectListContainer';

class App extends React.Component {

  private dataService = new DataService();

  constructor(props: any){
    super(props);
  }

  render() {
console.log("app", this.dataService.criteriaData);

    const t: ProjectInterface = {
      code:"1234", score:0, isPropCandidate:false, 
      attributes: undefined 
    };
console.log("t", t);
    return (
      <div className="App-container">
        <div className="App-sidebar">
          <CriterionListContainer criteriaData={this.dataService.criteriaData}/>
        </div>
        <div className="App-main">
          <ProjectListContainer projectsData={[t]} />
        </div>
      </div>
    );
  }
}

export default App;