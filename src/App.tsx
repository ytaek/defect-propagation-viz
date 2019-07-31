import * as React from 'react';
import './App.css';
import { DataService } from './services/DataService';
import CriterionListContainer from './containers/CriterionListContainer';
import ProjectListContainer from './containers/ProjectListContainer';
import { StoreState } from './redux/modules';
import { connect } from "react-redux";
import { CriteriaState } from './redux/modules/criteria';
import { ProjectsState } from './redux/modules/projects';

interface Props {
  criteria: CriteriaState;
  projects: ProjectsState;
}

class App extends React.Component<Props> {
  private dataService: DataService;

  constructor(props: any) {
    super(props);

    this.dataService = new DataService();

    this.props.projects.projects = this.dataService.projectsData;
    this.props.criteria.criteria = this.dataService.criteriaData;
  }

  render() {
    console.log("APP RENDER", this.props.criteria);

    return (
      <div id="App-wrapper">
        <div id="App-header">
          <div id="App-title">MCDM Vis</div>
        </div>
        <div className="App-container">
          <div className="App-sidebar">
            <CriterionListContainer />
          </div>
          <div className="App-main">
            <ProjectListContainer />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToPros = (state: StoreState) => ({
  projects: state.projectsState,
  criteria: state.criteriaState
});

const mapDispatchToPros = (dispatch: any) => ({
});

export default connect(
  mapStateToPros,
  mapDispatchToPros
)(App);