import React from 'react';
import { dataService } from './DataService'

class DynamicQueryAndWeight extends React.Component {
      
  render() {
        return(
          <div>
            <div>Hello DQW!!!asdf</div>
            <div>{dataService.getData().length}</div>
          </div>
           
        );
    }
}

export default DynamicQueryAndWeight;