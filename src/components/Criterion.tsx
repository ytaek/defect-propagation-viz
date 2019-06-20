import * as React from "react";
import { IMetadatum } from "../DataService";

export interface ICriterionProp {
  metaDatum: IMetadatum;
}

export interface ICriterionState {
  weights: any;
  criterionWeight: number;
}

export default class Criterion extends React.Component<ICriterionProp, ICriterionState> {
  public state: ICriterionState

  constructor(props: ICriterionProp){
    super(props)
    console.log(props)
    
    this.state = {
      weights: {},
      criterionWeight: 1
    }
    props.metaDatum.values.forEach(val => {
      this.state.weights[val] = 0
    })
  }

  public render() {
    return (
      <div className="flex-container flex-align-items-center">
        <label>{this.props.metaDatum.name}</label>
        { Object.keys(this.state.weights).map((d, i) => 
              <div key ={i}>
                <div>{d}</div>
                <div>{this.state.weights[d]}</div>
              </div>
         ) }
      </div>
    );
  }
}
