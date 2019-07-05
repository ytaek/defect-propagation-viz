import * as React from "react";
import { connect } from "react-redux";
import { ProjectInterface, CriterionInterface, CriterionValueStatus, CriterionValueInterface } from 'src/services/DataService';
import { projectsActionCreators } from 'src/redux/modules/projects';
import { bindActionCreators } from 'redux';
import { StoreState } from 'src/redux/modules';
import ProjectList from 'src/components/ProjectList';

interface Props {
    projects: ProjectInterface[];
    criteria: CriterionInterface[];
    projectsActions: typeof projectsActionCreators;
}

class ProjectListContainer extends React.Component<Props> {
    private _candidateCriterionValueList: CriterionValueInterface[];
    private _nonCandidateCriterionValueList: CriterionValueInterface[];
    private _weightCriterionValueList: CriterionValueInterface[];
    
    constructor(props: any) {
        super(props);

        // move somewhere
        this._candidateCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.CAND);
        this._nonCandidateCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.NONCAND);
        this._weightCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.WEIGHT);
    }

    render() {
console.log("ProjectListContainer", this.props);

        return (
          <ProjectList
            projects={this.props.projects} 
            onOrder={this.onOrder} 
          />
        );
    }

    onOrder = (): void => {
        const { projectsActions } = this.props;
        projectsActions.order();
    }

    private getCriterionValueListByStatus(status: CriterionValueStatus): CriterionValueInterface[] {
        const cvList: CriterionValueInterface[] = [];
        return this.props.criteria.reduce(
            (prev, cv) => (prev.concat(cv.values)), cvList)
            .filter(cv => (cv.status === status));
    }

}

const mapStateToPros = (state: StoreState) => ( {
    projects: state.projectsState.projects,
    criteria: state.criteriaState.criteria
});

const mapDispatchToPros = (dispatch: any) => ( {
    projectsActions: bindActionCreators(projectsActionCreators, dispatch)
});

export default connect(
    mapStateToPros,
    mapDispatchToPros
)(ProjectListContainer);