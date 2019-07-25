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
                <button onClick={this.test} >test</button>
                <ProjectList
                    projectState={this.props.projectState}
                    criteria={this.props.criteria}
                    // onOrder={this.onOrder}
                    onSetCandThreshold={this.onSetCandThreshold}
                    onSetNonCandThreshold={this.onSetNonCandThreshold}
                />
            </div>
        );
    }

    onSetCandThreshold = (th: number): void => {
        projectsActionCreators.setCandThreshold(th);
        console.log(th, this.props.projectState.thresholdScore);
    }

    onSetNonCandThreshold = (th: number): void => {
        projectsActionCreators.setNonCandThreshold(th);
    }


    test = (): void => {
        this.props.criteria[0].values[0].status = CriterionValueStatus.CAND;
        
        const { projectsActions, criteria } = this.props;
        projectsActions.calculateScore(criteria);
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


        const { projectsActions, criteria } = this.props;
        projectsActions.calculateScore(criteria);
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