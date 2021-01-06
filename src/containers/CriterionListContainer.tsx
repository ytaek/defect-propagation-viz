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
  inferredWeights: {};
  criteriaActions: typeof criteriaActionCreators;
  projectsActions: typeof projectsActionCreators;
}

class CriterionListContainer extends React.Component<Props> {

  render() {
    console.log("CriterionListContainer", this.props);

    return (
      <CriterionList
        criteria={this.props.criteria}
        inferredWeights={this.props.inferredWeights}
        onSetWeight={this.onSetWeight}
        onValueToggleWeight={this.onValueToggleWeight}
        onValueSetWeight={this.onValueSetWeight}
      />
    );
  }

  onSetWeight = (c: CriterionInterface, weight: number): void => {
    const { criteria, criteriaActions, projectsActions } = this.props;
    c.weight = weight;
    criteriaActions.setWeight(c);
    projectsActions.calculateScore(criteria);
  }

  onValueToggleWeight = (cv: CriterionValueInterface): void => {
    console.log("Container toggle called")
    const { criteria, criteriaActions, projectsActions } = this.props;
    criteriaActions.valueToggleWeight(cv);
    projectsActions.calculateScore(criteria);
  }

  onValueSetWeight = (cv: CriterionValueInterface, weight: number): void => {
    const { criteria, criteriaActions, projectsActions } = this.props;
    cv.weight = weight;
    criteriaActions.valueSetWeight(cv);
    projectsActions.calculateScore(criteria);
  }
}

const mapStateToPros = (state: StoreState) => ({
  criteria: state.criteriaState.criteria,
  inferredWeights: state.criteriaState.inferredWeights,
});

const mapDispatchToPros = (dispatch: any) => ({
  criteriaActions: bindActionCreators(criteriaActionCreators, dispatch),
  projectsActions: bindActionCreators(projectsActionCreators, dispatch),
});

export default connect(
  mapStateToPros,
  mapDispatchToPros
)(CriterionListContainer);