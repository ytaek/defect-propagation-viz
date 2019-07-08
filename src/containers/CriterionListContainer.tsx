import * as React from "react";
import { connect } from "react-redux";
import { CriterionInterface, CriterionValueInterface } from "../services/DataService";
import { StoreState } from '../redux/modules';
import { actionCreators } from 'src/redux/modules/criteria';
import { bindActionCreators } from 'redux';
import CriterionList from 'src/components/CriterionList';

interface Props {
    criteria: CriterionInterface[];
    criteriaActions: typeof actionCreators;
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
        let w = 0;
        const { weight } = cv;

        if (weight === 0) {
            w = 0.5;
        } else if (weight === 0.5) {
            w = 1;
        } else {
            w = 0;
        }
        
        cv.weight = w;
        
        const { criteriaActions } = this.props;
        criteriaActions.insertWeight();
    }
}

const mapStateToPros = (state: StoreState) => ( {
    criteria: state.criteriaState.criteria
});

const mapDispatchToPros = (dispatch: any) => ( {
    criteriaActions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
    mapStateToPros,
    mapDispatchToPros
)(CriterionListContainer);