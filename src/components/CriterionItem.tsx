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
  onSetWeight(c: CriterionInterface, weight: number): void;
  onValueToggleWeight(cv: CriterionValueInterface): void;
  onValueSetWeight(cv:CriterionValueInterface, weight: number): void;
}

export class CriterionItem extends React.Component<Props> {
  render() {

    return (
      <Row className="criterion-row">
        <Col xs={3} className="criterion-name">
          {this.props.criterion.name}
          <CriterionWeightControl
            onSetWeight={this.props.onSetWeight}
            criterion={this.props.criterion}/>
        </Col>
        <Col xs={9} className="criterion-category-list-container">
          {this.props.criterion.values.map(
            (cv: CriterionValueInterface, i: number) => (
              <CriterionValueWeightControl 
                key={i}
                onToggleWeight={this.props.onValueToggleWeight}
                onSetWeight={this.props.onValueSetWeight}
                criterionValue={cv}/>
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