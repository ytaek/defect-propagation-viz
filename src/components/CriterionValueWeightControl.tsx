import * as React from "react";
import { CriterionInterface, CriterionValueInterface, CriterionValueStatus } from 'src/services/DataService';

interface Props {
  criterionValue: CriterionValueInterface;
  onToggleWeight(cv: CriterionValueInterface): void;
  onSetWeight(cv:CriterionValueInterface, weight: number): void;
}

export class CriterionValueWeightControl extends React.Component<Props> {

  constructor(props: Props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onToggleWeight(this.props.criterionValue);
  }

  onMouseDown(event: any){
    console.log(event.screenX, ", ", event.screenY)
    return true
  }

  render() {
    let weightView
    if(this.props.criterionValue.status === CriterionValueStatus.WEIGHT){
      weightView = <div className="weight-slider" onMouseDown={this.onMouseDown}>
        <div className="slider-bar" style={{
          width: this.props.criterionValue.weight * 100 + 'px'
        }}/>
      </div>
    }

    return (
      <div className="category">
        <div className="name">{this.props.criterionValue.name}</div>
        <div className="status-container">
          <div className="status-button" onClick={this.handleClick}>
            {this.renderStatusSwitch(this.props.criterionValue.status)}
          </div>
          {weightView}
        </div>
      </div>)
  }

  renderStatusSwitch(status: CriterionValueStatus){
    // console.log("status: " , status, CriterionValueStatus.CAND, CriterionValueStatus.NONCAND, CriterionValueStatus.WEIGHT)
    switch(status){
      case CriterionValueStatus.CAND:
        return (<div className="status status-cand"/>)
      case CriterionValueStatus.NONCAND:
            console.log(status, CriterionValueStatus.NONCAND);
        return (<div className="status status-noncand">×</div>)
      case CriterionValueStatus.WEIGHT:
        default:
          return (<div className="status status-weight">W</div>)
    }
  }
}