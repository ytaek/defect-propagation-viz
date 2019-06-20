import * as React from 'react';
import Criterion from './components/Criterion';
import { DataService } from './DataService';

export interface ISidePanelProp{
  dataService: DataService
}

class SidePanel extends React.Component<ISidePanelProp>{

  public render(){
    return (
      <div>
        <div>sidebar</div>
        {
          this.props.dataService.meta.map((d, i) => <Criterion metaDatum={d} key={i}/>)
        }
      </div>
    );
  }
}

export default SidePanel;