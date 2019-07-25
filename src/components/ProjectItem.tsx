import * as React from "react";
import { ProjectInterface, CriterionValueInterface, CriterionInterface, ProjectAttributes, ProjectCandidateStatus } from "../services/DataService";
import * as d3 from "d3";
interface Props {
  project: ProjectInterface;
  candThreshold: number;
  criteria: CriterionInterface[];
  // candidateCriterionValueList: CriterionValueInterface[];
  // nonCandidateCriterionValueList: CriterionValueInterface[];
  // weightCriterionValueList: CriterionValueInterface[];
}

export class ProjectItem extends React.Component<Props> {
  render() {
    const { candThreshold, project, criteria } = this.props;

    // const candidates = this.props.criteria.map( (c) => {
    //   const cvList = this.props.candidateCriterionValueList.filter( cv => cv.criterion!.name === c.name).map( d => d.name);
    //   const ncvList = this.props.nonCandidateCriterionValueList.filter( cv => cv.criterion!.name === c.name).map( d => d.name);

    //   if (cvList.includes(project.attributes[c.name])) {return "O";}
    //   else if (ncvList.includes(project.attributes[c.name])) {return "X";}
    //   else {return "-";}
    // });

    const criterionWeights = criteria.map(c => {
      const value = project.attributes[c.name];
      return c.values.filter(cv => cv.name === value)[0].weight * c.weight;
    });

    const colors = d3.schemePastel2;
    const darkColors = d3.schemeSet2;
    
    let gradColor = "";
    // const nonCandThreshold = -0.1;

    const grad = d3.scaleLinear<string>()
        .domain([-1, 0, 1]).range(["orchid", "#e2e2e2", "skyblue"]);

    if (project.candidateStatus !== ProjectCandidateStatus.RULE) {
      // if (project.score > candThreshold || project.score < nonCandThreshold) {
      if (project.score > candThreshold / 100) {
        gradColor = grad(project.score);
      }
    }
    
    return (
      <div className="flex-container flex-align-items-center" 
          style={{
            backgroundColor:gradColor
          }}>
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
          {project.candidateOXList!.map( (c, i) => (<b key={i} style={{color:darkColors[i]}}>{c} </b>))}
        </div>
        <div className="score">
          <div style={{
            width: 150 * Math.abs(project.score),
            backgroundColor: "#cccccc",
            height: "13px"
          }}/>
          <div >{(project.score * 100).toFixed(1)}</div>
        </div> 
        <div className="candidate-bars">
        +
        {
          criteria.filter( (c, i) => criterionWeights[c.id] > 0).map( (c, i) => (
          // criteria.map( (c, i) => (
            <div key={i} className="attributes">
              <div className="weight-bar" style={{
                  width: 50*criterionWeights[c.id],
                  backgroundColor: colors[c.id],
                  height: "13px"
                }}>
                {/* {criterionWeights[c.id] !== 0 ? project.attributes[c.name] : ""} */}
              </div>
            </div>
          )) 
        }
        </div>
        <div className="cand-separator"/>
        <div className="noncandidate-bars">
        {
          criteria.filter( (c, i) => criterionWeights[c.id] < 0).map( (c, i) => (
            // criteria.map( (c) => (
            <div key={i} className="attributes">
              <div className="weight-bar" style={{
                  width: 50*(-1)*criterionWeights[c.id],
                  backgroundColor: colors[c.id],
                  height: "13px"
                }}> 
                {/* {criterionWeights[c.id] !== 0 ? project.attributes[c.name] : ""} */}
              </div>
            </div>
          ))
        }
        -
        </div>
        {
          // // criteria.filter(c => c.weight !== 0).map( (c, i) => (
          //   criteria.map( (c, i) => (
          //   <div key={i} className="attributes">
          //     <div style={{
          //         width:100*criterionWeights[i],
          //         backgroundColor: colors[i]
          //       }}>
          //       {criterionWeights[i] !== 0 ? project.attributes[c.name] : ""}
          //     </div>
          //   </div>
          // ))
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