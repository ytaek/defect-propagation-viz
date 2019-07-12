import * as React from "react";
import { Col, Row } from "react-bootstrap";
import {
  CriterionInterface,
  CriterionValueInterface
} from "../services/DataService";
import { CriterionValueWeightControl } from './CriterionValueWeightControl';

interface Props {
  criterion: CriterionInterface;
  onToggleWeight(cv: CriterionValueInterface): void;
  onSetWeight(cv:CriterionValueInterface, weight: number): void;
}

export class CriterionItem extends React.Component<Props> {
  render() {

    return (
      <Row className="criterion-row">
        <Col xs={3} className="criterion-name">
          ({this.props.criterion.id}) {this.props.criterion.name}
        </Col>
        <Col xs={9} className="criterion-category-list-container">
          {this.props.criterion.values.map(
            (cv: CriterionValueInterface, i: number) => (
              <CriterionValueWeightControl 
                key={i}
                onToggleWeight={this.props.onToggleWeight}
                onSetWeight={this.props.onSetWeight}
                criterionValue={cv}/>
            )
          )}
        </Col>
      </Row>
    );
  }

  onCategoryClicked = (cv: any) => {
    console.log(cv)
  }
}

export default CriterionItem;