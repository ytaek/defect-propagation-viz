import * as React from "react";
import { Col, Row } from "react-bootstrap";
import {
  CriterionInterface,
  CriterionValueInterface
} from "../services/DataService";
import { CriterionValueWeightControl } from './CriterionValueWeightControl';

interface Props {
  criterion: CriterionInterface;
  index: number;
}

export class CriterionItem extends React.Component<Props> {
  render() {
    console.log(this.props.index, this.props.criterion);

    return (
      <Row className="criterion-row">
        <Col xs={3} className="criterion-name">
          ({this.props.index}) {this.props.criterion.name}
        </Col>
        <Col xs={9} className="criterion-category-list-container">
          {this.props.criterion.values.map(
            (cv: CriterionValueInterface, i: number) => (
              <CriterionValueWeightControl key={i} name={cv.name} weight={cv.weight} />
            )
          )}
        </Col>
      </Row>
    );
  }

  onCategoryClicked = (criterionValue: any) => {
    console.log(criterionValue)
  }
}

export default CriterionItem;