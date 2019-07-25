import * as React from "react";
import { CriterionInterface, CriterionValueInterface, CriterionValueStatus } from 'src/services/DataService';
import * as d3 from "d3";

interface Props {
  criterionValue: CriterionValueInterface;
  onToggleWeight(cv: CriterionValueInterface): void;
  onSetWeight(cv: CriterionValueInterface, weight: number): void;
}

interface State {
  immediateWeight: number | null
}

export class CriterionValueWeightControl extends React.Component<Props, State> {

  private mouseDownSliderY: number
  private mouseDownClientY: number 
  private sliderSize: number

  constructor(props: Props) {
    super(props)

    this.state = { immediateWeight: null }

    this.handleClick = this.handleClick.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)


  }

  handleClick() {
    this.props.onToggleWeight(this.props.criterionValue);
  }

  onMouseDown(event: any) {
    console.log("mouse down")
    this.mouseDownSliderY = event.nativeEvent.offsetY
    this.mouseDownClientY = event.nativeEvent.clientY
    this.sliderSize = event.nativeEvent.srcElement.offsetHeight

    window.addEventListener('mouseup', this.onMouseUp, false);
    window.addEventListener('mousemove', this.onMouseMove, false);


    return true
  }

  onMouseUp(event: any) {
    this.onMouseMove(event);
    this.props.onSetWeight(this.props.criterionValue, this.state.immediateWeight!);
    this.setState({ immediateWeight: null });

    window.removeEventListener("mouseup", this.onMouseUp, false);
    window.removeEventListener("mousemove", this.onMouseMove, false);
  }

  onMouseMove(event: any) {
    const deltaY = event.clientY - this.mouseDownClientY
    this.setState({ immediateWeight: -(Math.min(1, Math.max(0, (this.mouseDownSliderY + deltaY) / this.sliderSize))*2 -1) })
  }

  render() {
    const colors = d3.schemePastel2;

    const styleObj = {
      backgroundColor: (colors[this.props.criterionValue.criterion!.id])
    } as any
    
    const weight = (this.state.immediateWeight || this.props.criterionValue.weight)

    styleObj.height = (Math.abs(weight)*.5 * 100) + "%"

    if(weight > 0){
      styleObj.bottom = '50%'
    }else{
      styleObj.top = '50%'
    }

    const indicatorStyleObj = {
      top: ((-weight + 1)/2 * 100) + "%"
    }

    let weightView;
    if (this.props.criterionValue.status === CriterionValueStatus.WEIGHT) {
      weightView = <div className="weight-slider" onMouseDown={this.onMouseDown}>
        <div className="slider-bar" style={styleObj} />
        <div className="zero-indicator"/>
        <div className="loc-indicator start" style={indicatorStyleObj}/>
        <div className="loc-indicator end" style={indicatorStyleObj}/>
      </div>
    }

    return (
      <div className="category">
        <div className="name">{this.props.criterionValue.name}</div>
        <div className="status-container">
          <div className="status-button" onClick={this.handleClick}>
            {this.renderStatusSwitch(this.props.criterionValue.status)}
          </div>
          <div className="flex-filler"/>
          {weightView}
        </div>
      </div>)
  }

  renderStatusSwitch(status: CriterionValueStatus) {
    // console.log("status: " , status, CriterionValueStatus.CAND, CriterionValueStatus.NONCAND, CriterionValueStatus.WEIGHT)
    switch (status) {
      case CriterionValueStatus.CAND:
        return (<div className="status status-cand" />)
      case CriterionValueStatus.NONCAND:
        console.log(status, CriterionValueStatus.NONCAND);
        return (<div className="status status-noncand">×</div>)
      case CriterionValueStatus.WEIGHT:
      default:
        return (<div className="status status-weight">W</div>)
    }
  }
}