import * as React from 'react';
import { ProjectInterface, CriterionValueInterface, CriterionValueStatus, CriterionInterface } from 'src/services/DataService';
import ProjectItem from './ProjectItem';
import './project.css';
import * as d3 from "d3";

interface Props {
  projects: ProjectInterface[];
  criteria: CriterionInterface[];
  onOrder(): void;
}

class ProjectList extends React.Component<Props> {

  test2 = () => {
    console.log(this.props.criteria[0].values[0].status);
    this.props.criteria[0].values[0].status = CriterionValueStatus.NONCAND;
    console.log(this.props.criteria[0].values[0].status);
  }

  render() {
    const candidateCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.CAND);
    const nonCandidateCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.NONCAND);
    const weightCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.WEIGHT);

console.log("ProjectList", this.props);
console.log("CAND = ", candidateCriterionValueList)
    const { projects, criteria } = this.props;

    const colors = d3.schemeDark2;
    
    // projects.sort( (a, b) => (b.score - a.score) );

    return (
      <div>
        {/* <div><button onClick={this.props.onOrder}>TEST</button></div>
        <div><button onClick={this.test2}>TEST#2</button></div> */}
        <div>project List</div>
        {/* <div className="flex-container flex-align-items-center">
          <label className="name">NAME</label>
          {
            candidateCriterionValueList.map( (cv: CriterionValueInterface) => (
              <div className="flex-container flex-align-items-center">
                {cv.name}
              </div>
            ))
          }
          <div>||</div>
          {
            nonCandidateCriterionValueList.map( (cv: CriterionValueInterface) => (
              <div className="flex-container flex-align-items-center">
                {cv.name}
              </div>
            ))
          }
        </div> */}
        <div className="flex-container flex-align-items-center">
          <div className="project-name">NAME</div>
          <div className="candidate-ox">
            CANDIDATE <br />
            {this.props.criteria.map( (d: any, i:number) => (
              <b key={i}>{i+1} </b>
            ))}
          </div>
          <div className="score">
            SCORES
          </div>
          {
            criteria.map( (c, i) => (
              <div key={i} className="attributes">
                <div style={{
                    width:100*c.weight,
                    backgroundColor: colors[i]
                  }}>
                  {c.weight !== 0 ? c.name : ""}
                </div>
              </div>
            ))
          }
        </div>
        {
          // sorting 
          // cand - grey - noncand
          projects.map( (prj: ProjectInterface, i: number) => 
            <ProjectItem 
              project={prj}
              criteria={criteria}
              candidateCriterionValueList={candidateCriterionValueList}
              nonCandidateCriterionValueList={nonCandidateCriterionValueList}
              weightCriterionValueList={weightCriterionValueList}
              key={i}/>
          )
        }
      </div>
    );
  }

  private getCriterionValueListByStatus(status: CriterionValueStatus): CriterionValueInterface[] {
    const cvList: CriterionValueInterface[] = [];
    return this.props.criteria.reduce(
        (prev, cv) => (prev.concat(cv.values)), cvList)
        .filter(cv => (cv.status === status));
  }
}

export default ProjectList; 