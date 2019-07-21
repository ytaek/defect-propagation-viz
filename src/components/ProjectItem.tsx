import * as React from "react";
import { ProjectInterface, CriterionValueInterface, CriterionInterface, ProjectAttributes } from "../services/DataService";
import * as d3 from "d3";
import { color } from 'd3';

interface Props {
  project: ProjectInterface;
  criteria: CriterionInterface[];
  candidateCriterionValueList: CriterionValueInterface[];
  nonCandidateCriterionValueList: CriterionValueInterface[];
  weightCriterionValueList: CriterionValueInterface[];
}

export class ProjectItem extends React.Component<Props> {
  render() {
    const { project, criteria } = this.props;

    const candidates = this.props.criteria.map( (c) => {
      const cvList = this.props.candidateCriterionValueList.filter( cv => cv.criterion!.name === c.name).map( d => d.name);
      const ncvList = this.props.nonCandidateCriterionValueList.filter( cv => cv.criterion!.name === c.name).map( d => d.name);

      if (cvList.includes(project.attributes[c.name])) {return "O";}
      else if (ncvList.includes(project.attributes[c.name])) {return "X";}
      else {return "-";}
    });

    const criterionWeights = criteria.map(c => {
      const value = project.attributes[c.name];
      return c.values.filter(cv => cv.name === value)[0].weight * c.weight;
    });

    const colors = d3.schemePastel1;

    return (
      <div className="flex-container flex-align-items-center">
        <div className="project-name">{project.code}</div>
        {/* {
          this.props.candidateCriterionValueList.map( (cv: CriterionValueInterface) => (
            project.attributes[cv.criterion!.name] === cv.name ? (
              <div className="flex-container flex-align-items-center criterion-value">
                <b>{project.attributes[cv.criterion!.name]}</b>
              </div>
            ): "-"
          ))
        } */}
        <div className="candidate-ox">
          {candidates.map( (c, i) => (<b key={i}>{c} </b>))}
        </div>
        <div className="score">
          [ {project.score.toFixed(2)} ]
        </div>
        {
          // criteria.filter(c => c.weight !== 0).map( (c, i) => (
            criteria.map( (c, i) => (
            <div key={i} className="attributes">
              <div style={{
                  width:100*criterionWeights[i],
                  backgroundColor: colors[i]
                }}>
                {criterionWeights[i] !== 0 ? project.attributes[c.name] : ""}
              </div>
            </div>
          ))
          // Object.keys(project.attributes).map( (key: string, i: number) => 
          //     <div key ={i}>
          //       <div>{project.attributes[key]}({})</div>
          //       {/* <div>{cv.weight}</div> */}
          //     </div>
          // )
        }
      </div>
    );
  }
}

export default ProjectItem;