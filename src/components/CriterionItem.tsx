import * as React from "react";
import { Col, Row } from "react-bootstrap";
import {
  CriterionInterface,
  CriterionValueInterface
} from "../services/DataService";

interface Props {
  criterion: CriterionInterface;
}

export class CriterionItem extends React.Component<Props> {
  render() {
    return (
      <Row className="criterion-row">
        <Col xs={3} className="criterion-name">
          {this.props.criterion.name}
        </Col>
        <Col xs={9} className="criterion-category-list-container">
          {this.props.criterion.values.map(
            (cv: CriterionValueInterface, i: number) => (
              <div className="category" key={i}>
                <div className="name">{cv.name}</div>
                <div className="weight">{cv.weight}</div>
              </div>
            )
          )}
        </Col>
      </Row>
    );
  }
}

export default CriterionItem;
