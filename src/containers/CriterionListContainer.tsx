import * as React from "react";
import { connect } from "react-redux";
import { CriterionInterface } from "../services/DataService";
import { StoreState } from '../redux/modules';
import { actionCreators } from 'src/redux/modules/criteria';
import { bindActionCreators } from 'redux';
import CriterionList from 'src/components/CriterionList';

interface Props {
    criteriaData: CriterionInterface[];
    criteriaActions: typeof actionCreators;
}

class CriterionListContainer extends React.Component<Props> {
    render() {
console.log("CriterionListContainer", this.props);

        return (
          <CriterionList
            criteria = {this.props.criteriaData} 
            onInsertWeight={this.onInsertWeight} 
            onDeleteWeight={this.onDeleteWeight} 
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
}

const mapStateToPros = (state: StoreState) => ( {
    criteria: state.criteria
});

const mapDispatchToPros = (dispatch: any) => ( {
    criteriaActions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
    mapStateToPros,
    mapDispatchToPros
)(CriterionListContainer);