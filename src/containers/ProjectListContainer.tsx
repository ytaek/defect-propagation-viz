import * as React from "react";
import { connect } from "react-redux";
import { ProjectInterface, CriterionInterface, CriterionValueStatus, CriterionValueInterface } from 'src/services/DataService';
import { projectsActionCreators } from 'src/redux/modules/projects';
import { bindActionCreators } from 'redux';
import { StoreState } from 'src/redux/modules';
import ProjectList from 'src/components/ProjectList';
import { criteriaReducer } from 'src/redux/modules/criteria';

interface Props {
    projects: ProjectInterface[];
    criteria: CriterionInterface[];
    projectsActions: typeof projectsActionCreators;
}

class ProjectListContainer extends React.Component<Props> {

    // constructor(props: any) {
    //     super(props);
    // }

    render() {
        return (
          <ProjectList
            projects={this.props.projects} 
            criteria={this.props.criteria}
            onOrder={this.onOrder} 
          />
        );
    }

    onOrder = (): void => {
        // test
        this.props.criteria[0].values[0].status = CriterionValueStatus.CAND;
        this.props.criteria[0].values[1].status = CriterionValueStatus.CAND;
        this.props.criteria[0].values[2].status = CriterionValueStatus.NONCAND;
        this.props.criteria[0].values[3].status = CriterionValueStatus.CAND;
        this.props.criteria[0].values[4].status = CriterionValueStatus.CAND;
        this.props.criteria[0].values[5].status = CriterionValueStatus.CAND;
        this.props.criteria[0].values[6].status = CriterionValueStatus.NONCAND;

        this.props.criteria[2].values[1].status = CriterionValueStatus.NONCAND;
        this.props.criteria[3].values[0].status = CriterionValueStatus.CAND;

        this.props.criteria[4].values[2].status = CriterionValueStatus.CAND;
        this.props.criteria[4].values[3].status = CriterionValueStatus.NONCAND;

        
        const { projectsActions } = this.props;
        projectsActions.order();
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