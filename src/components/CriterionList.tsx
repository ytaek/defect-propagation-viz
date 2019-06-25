import * as React from 'react';
import { CriterionInterface } from 'src/services/DataService';
import CriterionItem from './CriterionItem';

interface Props {
    criteria: CriterionInterface[];
    onInsertWeight(): void;
    onDeleteWeight(): void;
}

class CriterionList extends React.Component<Props> {
  render() {

    console.log("#####", this.props);

    return (
      <div>
        <div>sidebar</div>
        {
          this.props.criteria.map((d, i) => <CriterionItem criterion={d} key={i}/>)
        }
        <div><button onClick={this.props.onInsertWeight}>Insert</button></div>
        <div><button onClick={this.props.onDeleteWeight}>Delete</button></div>
      </div>
    );
  }
}

export default CriterionList; 