import * as React from 'react';
import './App.css';
import { DataService } from './services/DataService';
import { PredictCondition } from './services/PredictCondition';
import CriterionListContainer from './containers/CriterionListContainer';
import ProjectListContainer from './containers/ProjectListContainer';
import { StoreState } from './redux/modules';
import { connect } from "react-redux";
import { CriteriaState } from './redux/modules/criteria';
import { projectsActionCreators, ProjectsState } from './redux/modules/projects';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';

interface Props {
  criteria: CriteriaState;
  projects: ProjectsState;
  projectsActions: typeof projectsActionCreators;
}

class App extends React.Component<Props> {
  private dataService: DataService;
  private showValues: boolean;

  constructor(props: any) {
    super(props);

    this.dataService = new DataService();

    this.props.projects.projects = this.dataService.projectsData;
    this.props.criteria.criteria = this.dataService.criteriaData;

    this.showValues = this.props.projects.showValues;
  }

  onSetShowValues = (): void => {
    console.log("TOGGLED!! before", this.showValues); 
    this.showValues = !this.showValues;
    this.props.projectsActions.setShowValues(this.showValues);
    // this.props.projectsActions.setCandThreshold(10);
    console.log("TOGGLED!!", this.props.projects, );
  }

  weightInference = (): void => {
    const candNames = this.props.projects.userSelectedCandidateNames;
    console.log("selections => ", candNames);

    const pc : PredictCondition = new PredictCondition(20);  // set threshold
    const result = pc.predict(candNames);

    console.log(result);
  }

  clearInference = (): void => {
    console.log("clear")
  }

  render() {
    console.log("APP RENDER", this.props.criteria, this.props.projects);

    return (
      <div id="App-wrapper">
        <div id="App-header">
            <div id="App-title" style={{width:"1250px"}}>Issue Propagation Visualization</div>
            <div style={{textAlign:"end"}}>
              <Button
                variant="outlined"
                size="small"
                style={{fontSize:"8px", width:"70px", whiteSpace: "normal"}}
                onClick={this.onSetShowValues}
              >
                {!this.showValues ? "SHOW VALUES" : "SHOW WEIGHTS"}
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                size="small"
                style={{fontSize:"8px", width:"70px", whiteSpace: "normal"}}
                onClick={this.weightInference}
              >
                WEIGHTS INFERENCE
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                size="small"
                style={{fontSize:"8px", width:"70px", whiteSpace: "normal"}}
                onClick={this.clearInference}
              >
                CLEAR INFERENCE
              </Button>
            </div>
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
  criteria: state.criteriaState,
});

const mapDispatchToPros = (dispatch: any) => ({
    projectsActions: bindActionCreators(projectsActionCreators, dispatch)
});

export default connect(
  mapStateToPros,
  mapDispatchToPros
)(App);