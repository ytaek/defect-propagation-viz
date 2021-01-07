import * as React from "react";
import { connect } from "react-redux";
import { CriterionInterface, CriterionValueStatus, CriterionValueInterface } from 'src/services/DataService';
import { projectsActionCreators, ProjectsState } from 'src/redux/modules/projects';
import { bindActionCreators } from 'redux';
import { StoreState } from 'src/redux/modules';
import ProjectList from 'src/components/ProjectList';

interface Props {
    projectsState: ProjectsState;
    criteria: CriterionInterface[];
    projectsActions: typeof projectsActionCreators;
}

class ProjectListContainer extends React.Component<Props> {
    // constructor(props: any) {
    //     super(props);
    // }

    // private calculateProjectScores() {
    //     const { projectsActions } = this.props;
    //     projectsActions.order();
    // }

    render() {
        const { projectsActions, criteria } = this.props;
// console.log("Container render reloaded!!", this.props.criteria, this.props.projectsState)
        return (
            <div>
                <ProjectList
                    projectsState={this.props.projectsState}
                    criteria={this.props.criteria}
                    onSetCandThreshold={this.onSetCandThreshold}
                    onSetNonCandThreshold={this.onSetNonCandThreshold}
                    projectSelectedByUser={this.projectSelectedByUser}
                />
            </div>
        );
    }

    onSetCandThreshold = (th: number): void => {
        const { projectsActions } = this.props;
        projectsActions.setCandThreshold(th);

        console.log(th, this.props.projectsState.thresholdScore);
    }

    onSetNonCandThreshold = (th: number): void => {
        // projectsActionCreators.setNonCandThreshold(th);
    }

    projectSelectedByUser = (name: string): void => {
        if (this.props.projectsState.userSelectedCandidateNames.indexOf(name) === -1) {
            this.addCandidate(name);
        } else{
            this.removeCandidate(name);
        }
    }
    
    addCandidate = (proj: string): void => {
        this.props.projectsActions.addCandidate(proj);
        console.log("addCand:", proj,this.props.projectsState.userSelectedCandidateNames);
    }

    removeCandidate = (proj: string): void => {
        this.props.projectsActions.removeCandidate(proj);
        console.log("removeCand:", proj,this.props.projectsState.userSelectedCandidateNames);
    }
}

const mapStateToPros = (state: StoreState) => ({
    projectsState: state.projectsState,
    criteria: state.criteriaState.criteria
});

const mapDispatchToPros = (dispatch: any) => ({
    projectsActions: bindActionCreators(projectsActionCreators, dispatch)
});

export default connect(
    mapStateToPros,
    mapDispatchToPros
)(ProjectListContainer);