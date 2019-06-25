import * as React from "react";
import { ProjectInterface } from "../services/DataService";

interface Props {
  project: ProjectInterface;
}

export class ProjectItem extends React.Component<Props> {
  render() {
    const { project } = this.props;

    console.log("prj", project)
    
    if (project.attributes === undefined) {
      project.attributes = [];
    }

    return (
      <div className="flex-container flex-align-items-center">
        <label>{project.code}</label>
        { Object.keys(project.attributes).map( (key: string, i: number) => 
              <div key ={i}>
                <div>{project.attributes[key]}</div>
                {/* <div>{cv.weight}</div> */}
              </div>
          ) 
        }
      </div>
    );
  }
}

export default ProjectItem;