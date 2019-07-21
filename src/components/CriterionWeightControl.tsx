import * as React from "react";
import { CriterionInterface } from 'src/services/DataService';
import * as d3 from "d3";

interface Props {
  criterion: CriterionInterface;
  onSetWeight(cv: CriterionInterface, weight: number): void;
}

interface State {
  immediateWeight: number | null
}

export class CriterionWeightControl extends React.Component<Props, State> {
 
  private mouseDownSliderX: number;
  private mouseDownClientX: number ;
  private sliderWidth: number;

  constructor(props: Props) {
    super(props);

    this.state = { immediateWeight: null };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onMouseDown(event: any) {
    console.log("mouse down");
    this.mouseDownSliderX = event.nativeEvent.offsetX;
    this.mouseDownClientX = event.nativeEvent.clientX;
    this.sliderWidth = event.nativeEvent.srcElement.offsetWidth;

    window.addEventListener('mouseup', this.onMouseUp, false);
    window.addEventListener('mousemove', this.onMouseMove, false);


    return true;
  }

  onMouseUp(event: any) {
    this.onMouseMove(event);
    this.props.onSetWeight(this.props.criterion, this.state.immediateWeight!);
    this.setState({ immediateWeight: null });

    window.removeEventListener("mouseup", this.onMouseUp, false);
    window.removeEventListener("mousemove", this.onMouseMove, false);
  }

  onMouseMove(event: any) {

    const deltaX = event.clientX - this.mouseDownClientX
    console.log("deltaX: ", deltaX)
    this.setState({ immediateWeight: Math.min(1, Math.max(0, (this.mouseDownSliderX + deltaX) / this.sliderWidth)) });
  }

  render() {
    const colors = d3.schemePastel1;
    let weightView
    weightView = <div className="criterion-weight-slider" onMouseDown={this.onMouseDown}>
        <div className="slider-bar" style={{
          width: (this.state.immediateWeight || this.props.criterion.weight) * 100 + '%',
          backgroundColor: (colors[this.props.criterion.id])
        }} />
      </div>

    return (
      <div className="status-container">
        {weightView}
      </div>
    );
  }
}