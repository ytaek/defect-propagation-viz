import * as React from "react";
import { Col, Row } from "react-bootstrap";
import {
  CriterionInterface,
  CriterionValueInterface
} from "../services/DataService";
import { CriterionValueWeightControl } from './CriterionValueWeightControl';
import { CriterionWeightControl } from './CriterionWeightControl';

interface Props {
  criterion: CriterionInterface;
  inferredWeights: {};
  onSetWeight(c: CriterionInterface, weight: number): void;
  onValueToggleWeight(cv: CriterionValueInterface): void;
  onValueSetWeight(cv:CriterionValueInterface, weight: number): void;
}

export class CriterionItem extends React.Component<Props> {
  render() {
// console.log("criterion", this.props.criterion);

    const maxInferenceWeight = Math.max(...this.props.criterion.values.filter( cv => cv.name in this.props.inferredWeights )
      .map(cv => this.props.inferredWeights[cv.name]).concat(-1));
    
    return (
      <Row className="criterion-row">
        <Col xs={3} className="criterion-name">
          {this.props.criterion.name}
          <CriterionWeightControl
            onSetWeight={this.props.onSetWeight}
            criterion={this.props.criterion}
            maxInferenceWeight={maxInferenceWeight}
          />
        </Col>
        <Col xs={9} className="criterion-category-list-container">
          {this.props.criterion.values.map(
            (cv: CriterionValueInterface, i: number) => (
              <CriterionValueWeightControl 
                key={i}
                onToggleWeight={this.props.onValueToggleWeight}
                onSetWeight={this.props.onValueSetWeight}
                criterionValue={cv}
                criterionWeight={this.props.criterion.weight}
                inferredWeight={this.props.inferredWeights[cv.name]}
              />
            )
          )}
        </Col>
      </Row>
    );
  }

  onCategoryClicked = (cv: any) => {
    console.log(cv);
  }
}

export default CriterionItem;