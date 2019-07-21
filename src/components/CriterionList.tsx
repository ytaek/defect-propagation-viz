import * as React from 'react';
import { CriterionInterface, CriterionValueInterface } from 'src/services/DataService';
import CriterionItem from './CriterionItem';
import {Container} from 'react-bootstrap';

interface Props {
    criteria: CriterionInterface[];
    onSetWeight(c:CriterionInterface, weight: number): void;
    onValueToggleWeight(cv: CriterionValueInterface): void;
    onValueSetWeight(cv:CriterionValueInterface, weight: number): void;
}

class CriterionList extends React.Component<Props> {
  render() {

    console.log("#####", this.props);

    return (
      <div id="criterion-list-panel">
        <Container>
          {
            this.props.criteria.map((d, i) => 
              <CriterionItem 
                criterion={d}
                onSetWeight={this.props.onSetWeight}
                onValueToggleWeight={this.props.onValueToggleWeight}
                onValueSetWeight={this.props.onValueSetWeight}
                key={i}/>)
          }
        </Container>
      </div>
    );
  }
}

export default CriterionList; 