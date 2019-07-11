import * as React from "react";
import { CriterionInterface, CriterionValueInterface } from 'src/services/DataService';

interface Props {
    criterionValue: CriterionValueInterface;
    onToggleWeight(cv: CriterionValueInterface): void;
}

export class CriterionValueWeightControl extends React.Component<Props> {

    constructor(props: Props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.onToggleWeight(this.props.criterionValue);
    }

    render(){
        return (<div className="category btn btn-light" onClick={this.handleClick}>
                <div className="name">{this.props.criterionValue.name}</div>
                <div className="weight">{this.props.criterionValue.weight}</div>
              </div>)
    }
}