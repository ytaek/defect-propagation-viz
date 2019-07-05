import * as React from "react";
import { ProjectInterface, CriterionValueInterface } from "../services/DataService";

interface Props {
  project: ProjectInterface;
  candidateCriterionValueList: CriterionValueInterface[];
  nonCandidateCriterionValueList: CriterionValueInterface[];
  weightCriterionValueList: CriterionValueInterface[];
}

export class ProjectItem extends React.Component<Props> {
  render() {
    const { project } = this.props;

    // if (project.attributes === undefined) {
    //   project.attributes = [];
    // }

    this.props.candidateCriterionValueList.map( (cv: CriterionValueInterface) => (
console.log(project.attributes[cv.criterion!.name], cv.name, project.attributes[cv.criterion!.name] === cv.name)
    ));

    return (
      <div className="flex-container flex-align-items-center">
        <label className="name">{project.code}</label>
        {/* {
          this.props.candidateCriterionValueList.map( (cv: CriterionValueInterface) => (
            project.attributes[cv.criterion!.name] === cv.name ? (
              <div className="flex-container flex-align-items-center criterion-value">
                <b>{project.attributes[cv.criterion!.name]}</b>
              </div>
            ): "-"
          ))
        } */}
        <div className="status-value">
          {
            this.props.candidateCriterionValueList.map( (cv: CriterionValueInterface) => (
              project.attributes[cv.criterion!.name] === cv.name ? (
                <b>O</b>
              ): ""
            ))
          }
        </div>
        <div className="status-value">
        {
          this.props.nonCandidateCriterionValueList.map( (cv: CriterionValueInterface) => (
            project.attributes[cv.criterion!.name] === cv.name ? (
              <b>X</b>
            ): ""
          ))
        }
        </div>
        { 
          Object.keys(project.attributes).map( (key: string, i: number) => 
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