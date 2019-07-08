import * as React from "react";
import { connect } from "react-redux";
import { CriterionInterface, CriterionValueInterface } from "../services/DataService";
import { StoreState } from '../redux/modules';
import { criteriaActionCreators } from 'src/redux/modules/criteria';
import { bindActionCreators } from 'redux';
import CriterionList from 'src/components/CriterionList';
import { projectsActionCreators } from 'src/redux/modules/projects';

interface Props {
    criteria: CriterionInterface[];
    criteriaActions: typeof criteriaActionCreators;
    projectsActions: typeof projectsActionCreators;
}

class CriterionListContainer extends React.Component<Props> {
    
    render() {
console.log("CriterionListContainer", this.props);

        return (
          <CriterionList
            criteria = {this.props.criteria} 
            onInsertWeight={this.onInsertWeight} 
            onDeleteWeight={this.onDeleteWeight} 
            onToggleWeight={this.onToggleWeight}
          />
        );
    }

    onInsertWeight = (): void => {
        const { criteriaActions } = this.props;
        criteriaActions.insertWeight();
    }
    onDeleteWeight = (): void => {
        const { criteriaActions } = this.props;
        criteriaActions.deleteWeight();
    }

    onToggleWeight = (cv: CriterionValueInterface): void => {
console.log("Container toggle called")
        const { criteria, criteriaActions, projectsActions } = this.props;
        criteriaActions.toggleWeight(cv);
        projectsActions.calculateScore(criteria);
    }
}

const mapStateToPros = (state: StoreState) => ( {
    criteria: state.criteriaState.criteria
});

const mapDispatchToPros = (dispatch: any) => ( {
    criteriaActions: bindActionCreators(criteriaActionCreators, dispatch),
    projectsActions: bindActionCreators(projectsActionCreators, dispatch),
});

export default connect(
    mapStateToPros,
    mapDispatchToPros
)(CriterionListContainer);