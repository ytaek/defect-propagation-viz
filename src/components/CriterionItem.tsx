import * as React from "react";
import { CriterionInterface, CriterionValueInterface } from "../DataService";

interface Props {
  criterion: CriterionInterface;
}

export class CriterionItem extends React.Component<Props> {
  render() {
    return (
      <div className="flex-container flex-align-items-center">
        <label>{this.props.criterion.name}</label>
        { this.props.criterion.values.map((cv:CriterionValueInterface, i: number) => 
              <div key ={i}>
                <div>{cv.name}</div>
                <div>{cv.weight}</div>
              </div>
         ) }
      </div>
    );
  }
}

export default CriterionItem;