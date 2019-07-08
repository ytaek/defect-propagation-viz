import * as React from "react";
import { ProjectInterface, CriterionValueInterface, CriterionInterface } from "../services/DataService";

interface Props {
  project: ProjectInterface;
  criteria: CriterionInterface[];
  candidateCriterionValueList: CriterionValueInterface[];
  nonCandidateCriterionValueList: CriterionValueInterface[];
  weightCriterionValueList: CriterionValueInterface[];
}

export class ProjectItem extends React.Component<Props> {
  render() {
    const { project } = this.props;

    const candidates = this.props.criteria.map( (c) => {
      const cvList = this.props.candidateCriterionValueList.filter( cv => cv.criterion === c).map( d => d.name);
      const ncvList = this.props.nonCandidateCriterionValueList.filter( cv => cv.criterion === c).map( d => d.name);

      if (cvList.includes(project.attributes[c.name])) {return "O";}
      else if (ncvList.includes(project.attributes[c.name])) {return "X";}
      else {return "-";}
    });

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
          {candidates.map( (c, i) => (<b key={i}>{c} </b>))}
        </div>
        <div className="SCORE">
          [ {project.score} ]
        </div>
        { 
          Object.keys(project.attributes).map( (key: string, i: number) => 
              <div key ={i}>
                <div>{project.attributes[key]}({0.0})</div>
                {/* <div>{cv.weight}</div> */}
              </div>
          ) 
        }
      </div>
    );
  }
}

export default ProjectItem;