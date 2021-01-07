import * as React from "react";
import { ProjectInterface, CriterionValueInterface, CriterionInterface, ProjectAttributes, ProjectCandidateStatus } from "../services/DataService";
import * as d3 from "d3";
import { projectReducer } from 'src/redux/modules/projects';
interface Props {
  project: ProjectInterface;
  candThreshold: number;
  criteria: CriterionInterface[];
  showValues: boolean;
  userSelectedCandidateNames: string[];
  // candidateCriterionValueList: CriterionValueInterface[];
  // nonCandidateCriterionValueList: CriterionValueInterface[];
  // weightCriterionValueList: CriterionValueInterface[];
  projectSelectedByUser(proj: string): void;
}

export class ProjectItem extends React.Component<Props> {
  projectSelectedByUser = (name: string):void => {
    console.log(name);
    this.props.projectSelectedByUser(name);
  }

  render() {
    const { candThreshold, project, criteria, showValues } = this.props;
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

    let bColor = "#e2e2e2";
    let fColor = "#212529";
    let code = project.code;
    if (this.props.userSelectedCandidateNames.indexOf(project.code) > -1) {
      bColor = "#f50057";
      fColor = "#f50057";
      code = "✔" + project.code;
    }

    return (
      <div className="flex-container flex-align-items-center" 
          style={{
            backgroundColor:gradColor,
            borderWidth: "1px",
            borderStyle: "none none solid none",
            borderColor: bColor,
          }}>
        <div className="project-name main-cell"
          style={{cursor:"pointer", color:fColor}}
          onClick={() => this.projectSelectedByUser(project.code)}
        >{code}</div>
        {/* {
          this.props.candidateCriterionValueList.map( (cv: CriterionValueInterface) => (
            project.attributes[cv.criterion!.name] === cv.name ? (
              <div className="flex-container flex-align-items-center criterion-value">
                <b>{project.attributes[cv.criterion!.name]}</b>
              </div>
            ): "-"
          ))
        } */}
        <div className="candidate-ox main-cell">
            {project.candidateOXList!.map( (c, i) => (
              <div style={{
                width: 10,
                color: darkColors[i],
                height: "100%"
              }}>
                <b key={i} style={{color:darkColors[i]}}>{c} </b>
              </div>
            ))}
        </div>
        <div className="score main-cell no-padding">
          <div style={{
            width: 150 * Math.abs(project.score),
            backgroundColor: (project.score < 0 ? grad(project.score) : "#cccccc"),
            height: "13px"
          }}/>
          <div >{(Math.abs(project.score * 100).toFixed(1))}</div>
        </div> 
        {
          !showValues ?
          <div className="flex-container">
            <div className="candidate-bars">
            {
              criteria.filter( (c, i) => criterionWeights[c.id] > 0).map( (c, i) => (
              // criteria.map( (c, i) => (
                <div key={i} className="attributes">
                  <div className="weight-bar" style={{
                      width: 50*criterionWeights[c.id],
                      backgroundColor: colors[c.id],
                      height: "13px"
                    }}>
                    {criterionWeights[c.id] !== 0 ? project.attributes[c.name] : ""}
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
                    {criterionWeights[c.id] !== 0 ? project.attributes[c.name] : ""}
                  </div>
                </div>
              ))
            }
            </div>
          </div>
          :
          <div className="bars" style={{ justifyContent: "flex-left", padding: 0 }}>
            {
              criteria.map((c, i) => {
                let bgImage = `linear-gradient(90deg, ${"white"} ${(1-criterionWeights[c.id])*100}%, ${colors[i]} ${1-criterionWeights[c.id]*100}%)`;

                c.values.forEach( (v) => {
                  if (v.name === project.attributes[c.name]) {
                    if (v.status === 1) {
                      bgImage = "linear-gradient(90deg, skyblue 100%, skyblue 100%)";
                    } else if (v.status === 3) {
                      bgImage = "linear-gradient(90deg, orchid 100%, orchid 100%)";
                    }
                  }
                });
              
                return (
                  <div key={i} className="attributes-values">
                    <div style={{
                      marginTop: "0px",
                      marginBottom: "0px",
                      marginLeft: "2px",
                      marginRight: "2px",
                      // fontWeight: "bold",
                      textAlign: "center",
                      width: 60 * c.weight,
                      // backgroundColor: colors[i]
                      backgroundImage: bgImage
                    }}>
                      {/* {c.weight !== 0 ? c.name : ""} */
                        project.attributes[c.name]
                      }
                    </div>
                  </div>
                );
              })
            }
          </div>
        }
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