import * as React from 'react';
import { ProjectInterface } from 'src/DataService';
import ProjectItem from './ProjectItem';

interface Props {
  projects: ProjectInterface[];
  onOrder(): void;
}

class ProjectList extends React.Component<Props> {
  render() {
    console.log("ProjectList", this.props);
    const { projects } = this.props;

    return (
      <div>
        <div>project List</div>
        {
          projects.map( (prj: ProjectInterface, i: number) => 
            <ProjectItem project={prj} key={i}/>
          )
        }
        <div><button onClick={this.props.onOrder}>Order</button></div>
      </div>
    );
  }
}

export default ProjectList; 