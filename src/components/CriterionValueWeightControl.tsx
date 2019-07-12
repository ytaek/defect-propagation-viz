import * as React from "react";
import { CriterionInterface, CriterionValueInterface, CriterionValueStatus } from 'src/services/DataService';

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

  render() {
    return (
      <div className="category btn btn-light">
        <div className="name">{this.props.criterionValue.name}</div>
        <div className="status-container">
          <div className="status-button" onClick={this.handleClick}>
            {this.renderStatusSwitch(this.props.criterionValue.status)}
          </div>
          <div className="weight">{this.props.criterionValue.weight}</div>
        </div>
      </div>)
  }

  renderStatusSwitch(status: CriterionValueStatus){
    switch(status){
      case CriterionValueStatus.CAND:
        return (<div className="status status-cand"/>)
      case CriterionValueStatus.NONCAND:
        return (<div className="status status-noncand">W</div>)
      case CriterionValueStatus.WEIGHT:
        default:
          return (<div className="status status-weight"/>)
    }
  }
}