import * as React from "react";
import { connect } from "react-redux";
import { CriterionInterface, CriterionValueStatus, CriterionValueInterface } from 'src/services/DataService';
import { projectsActionCreators, ProjectsState } from 'src/redux/modules/projects';
import { bindActionCreators } from 'redux';
import { StoreState } from 'src/redux/modules';
import ProjectList from 'src/components/ProjectList';

interface Props {
    projectState: ProjectsState;
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
console.log("Container render reloaded!!", this.props.criteria)
        return (
            <div>
                <ProjectList
                    projectState={this.props.projectState}
                    criteria={this.props.criteria}
                    onSetCandThreshold={this.onSetCandThreshold}
                    onSetNonCandThreshold={this.onSetNonCandThreshold}
                />
            </div>
        );
    }

    onSetCandThreshold = (th: number): void => {
        const { projectsActions } = this.props;
        projectsActions.setCandThreshold(th);

        console.log(th, this.props.projectState.thresholdScore);
    }

    onSetNonCandThreshold = (th: number): void => {
        projectsActionCreators.setNonCandThreshold(th);
    }
}

const mapStateToPros = (state: StoreState) => ({
    projectState: state.projectsState,
    criteria: state.criteriaState.criteria
});

const mapDispatchToPros = (dispatch: any) => ({
    projectsActions: bindActionCreators(projectsActionCreators, dispatch)
});

export default connect(
    mapStateToPros,
    mapDispatchToPros
)(ProjectListContainer);