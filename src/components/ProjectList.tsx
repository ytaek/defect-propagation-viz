import * as React from 'react';
import { ProjectInterface, CriterionValueInterface, CriterionValueStatus, CriterionInterface, ProjectCandidateStatus } from 'src/services/DataService';
import ProjectItem from './ProjectItem';
import './project.css';
import * as d3 from "d3";
import { ProjectsState } from 'src/redux/modules/projects';

interface Props {
  projectState: ProjectsState;
  criteria: CriterionInterface[];
  onOrder(): void;
}

class ProjectList extends React.Component<Props> {

  render() {
    const { projectState: projectState, criteria } = this.props;
    const projects = projectState.projects;
    const thresholdScore = projectState.thresholdScore; 
    const colors = d3.schemePastel2;
    const darkColors = d3.schemeSet2;

    const candidateCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.CAND);
    const nonCandidateCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.NONCAND);
    const weightCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.WEIGHT);
    
    // sort projects
    projects.forEach( project => {
      let candCnt = 0;
      let nonCandCnt = 0;
      const candidates = this.props.criteria.map( (c) => {
        const cvList = candidateCriterionValueList.filter( cv => cv.criterion!.name === c.name).map( d => d.name);
        const ncvList = nonCandidateCriterionValueList.filter( cv => cv.criterion!.name === c.name).map( d => d.name);
  
        if (cvList.includes(project.attributes[c.name])) {
          candCnt++;
          return "O";
        }
        else if (ncvList.includes(project.attributes[c.name])) {
          nonCandCnt++;
          return "X";
        }
        else {return "-";}
      });
      project.candidateOXList = candidates;
      
      if (candCnt > 0 && nonCandCnt === 0) {
        project.candidateStatus = ProjectCandidateStatus.RULE;
        project.isCandidate = true;
        project.candidateRuleScore = candCnt;
      } else if (candCnt === 0 && nonCandCnt > 0) {
        project.candidateStatus = ProjectCandidateStatus.RULE;
        project.isCandidate = false;
        project.candidateRuleScore = nonCandCnt;
      } else if (candCnt > 0 && nonCandCnt > 0) {
        project.candidateStatus = ProjectCandidateStatus.CONFLICT;
        project.candidateRuleScore = candCnt - nonCandCnt;
      } else {
        project.candidateStatus = ProjectCandidateStatus.GREY;
        project.candidateRuleScore = candCnt - nonCandCnt;
      }
    });
    
    const candProjectsByRule = projects.filter(p => (
      p.candidateStatus === ProjectCandidateStatus.RULE
      && p.isCandidate))
      .sort((a, b) => (b.candidateRuleScore! - a.candidateRuleScore!))
      .map(d => d);
    
    const greyProjects = projects.filter(p => (
      p.candidateStatus !== ProjectCandidateStatus.RULE))
      .sort((a, b) => (b.score - a.score))
      .map(d => d);
    
    const nonCandProjectsByRule = projects.filter(p => (
      p.candidateStatus === ProjectCandidateStatus.RULE
      && !p.isCandidate))
      .sort((a, b) => (b.candidateRuleScore! - a.candidateRuleScore!))
      .map(d => d);
    
    console.log("LENGTH = ", (candProjectsByRule.length + greyProjects.length + nonCandProjectsByRule.length))
    // projects.sort( (a, b) => (b.score - a.score) );

    return (
      <div>
        {/* <div><button onClick={this.props.onOrder}>TEST</button></div>
        <div><button onClick={this.test2}>TEST#2</button></div> */}
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
          <div className="project-name"><b>NAME</b></div>
          <div className="candidate-ox">
            <b>CANDIDATE</b> <br />
            {this.props.criteria.map( (d: any, i:number) => (
              <b key={i} style={{color:darkColors[i]}}>{i+1} </b>
            ))}
          </div>
          <div className="score">
            <b>SCORES</b>
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
        <div>
        {
          // sorting 
          // cand - grey - noncand
          candProjectsByRule.map( (prj: ProjectInterface, i: number) => 
            <ProjectItem 
              project={prj}
              criteria={criteria}
              key={i}/>
          )
        }
        </div>
        <div className="separator" />
        <div>
        {
          // sorting 
          // cand - grey - noncand
          greyProjects.map( (prj: ProjectInterface, i: number) => 
            <ProjectItem 
              project={prj}
              criteria={criteria}
              key={i}/>
          )
        }
        </div>
        <div className="separator" />
        <div>
        {
          // sorting 
          // cand - grey - noncand
          nonCandProjectsByRule.map( (prj: ProjectInterface, i: number) => 
            <ProjectItem 
              project={prj}
              criteria={criteria}
              key={i}/>
          )
        }
        </div>
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