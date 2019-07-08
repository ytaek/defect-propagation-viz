import * as React from 'react';
import { CriterionInterface, CriterionValueInterface } from 'src/services/DataService';
import CriterionItem from './CriterionItem';
import {Container} from 'react-bootstrap';

interface Props {
    criteria: CriterionInterface[];
    onInsertWeight(): void;
    onDeleteWeight(): void;
    onToggleWeight(cv: CriterionValueInterface): void;
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
                onToggleWeight={this.props.onToggleWeight}
                index={i+1} 
                key={i}/>)
          }
        </Container>
      </div>
    );
  }
}

export default CriterionList; 