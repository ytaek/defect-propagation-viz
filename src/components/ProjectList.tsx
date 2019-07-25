import * as React from 'react';
import { ProjectInterface, CriterionValueInterface, CriterionValueStatus, CriterionInterface, ProjectCandidateStatus } from 'src/services/DataService';
import ProjectItem from './ProjectItem';
import './project.css';
import * as d3 from "d3";
import { ProjectsState } from 'src/redux/modules/projects';
import { Col, Row } from "react-bootstrap";

const CANDIDATE_WEIGHT_WIDTH = 150

interface Props {
  projectState: ProjectsState;
  criteria: CriterionInterface[];
  // onOrder(): void;
  onSetCandThreshold(th: number): void;
  onSetNonCandThreshold(th: number): void;
}

interface State {
  immediateThresholdScore: number | null
}

class ProjectList extends React.Component<Props, State> {

  private mouseDownSliderX: number
  private mouseDownClientX: number
  private sliderSize: number

  constructor(props: Props) {
    super(props)

    this.state = { immediateThresholdScore: null }

    this.mouseDownOnThresholdBar = this.mouseDownOnThresholdBar.bind(this)
    this.mouseMoveForThresholdBar = this.mouseMoveForThresholdBar.bind(this)
    this.mouseUpForThresholdBar = this.mouseUpForThresholdBar.bind(this)
  }

  mouseDownOnThresholdBar(event: any) {
    this.mouseDownSliderX = event.nativeEvent.offsetX
    this.mouseDownClientX = event.nativeEvent.clientX
    this.sliderSize = event.nativeEvent.srcElement.offsetWidth

    window.addEventListener('mouseup', this.mouseUpForThresholdBar, false);
    window.addEventListener('mousemove', this.mouseMoveForThresholdBar, false);
  }

  mouseMoveForThresholdBar(event: any) {
    const deltaX = event.clientX - this.mouseDownClientX

    this.setState({
      immediateThresholdScore: Math.min(1, Math.max(0, (this.mouseDownSliderX + deltaX) / this.sliderSize)) * 100
    })
  }

  mouseUpForThresholdBar(event: any) {
    this.mouseMoveForThresholdBar(event)

    this.changeThresholdScore(this.state.immediateThresholdScore!)

    window.removeEventListener("mouseup", this.mouseUpForThresholdBar, false);
    window.removeEventListener("mousemove", this.mouseMoveForThresholdBar, false);
  }

  changeThresholdScore(value: number) {
    this.props.onSetCandThreshold(value);
  }

  render() {
    const { projectState: projectState, criteria } = this.props;
    const projects = projectState.projects;

    // TODO uncomment this row
    const thresholdScore = projectState.thresholdScore || this.state.immediateThresholdScore || 0; 
    // const thresholdScore = this.state.immediateThresholdScore || 0;


    const colors = d3.schemePastel2;
    const darkColors = d3.schemeSet2;

    const candidateCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.CAND);
    const nonCandidateCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.NONCAND);
    const weightCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.WEIGHT);

    // sort projects
    projects.forEach(project => {
      let candCnt = 0;
      let nonCandCnt = 0;
      const candidates = this.props.criteria.map((c) => {
        const cvList = candidateCriterionValueList.filter(cv => cv.criterion!.name === c.name).map(d => d.name);
        const ncvList = nonCandidateCriterionValueList.filter(cv => cv.criterion!.name === c.name).map(d => d.name);

        if (cvList.includes(project.attributes[c.name])) {
          candCnt++;
          return "O";
        }
        else if (ncvList.includes(project.attributes[c.name])) {
          nonCandCnt++;
          return "X";
        }
        else { return "-"; }
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
      .sort((a, b) => (b.score - a.score))
      .sort((a, b) => (b.candidateRuleScore! - a.candidateRuleScore!))
      .map(d => d);

    const greyProjects = projects.filter(p => (
      p.candidateStatus !== ProjectCandidateStatus.RULE))
      .sort((a, b) => (b.score - a.score))
      .map(d => d);

    const nonCandProjectsByRule = projects.filter(p => (
      p.candidateStatus === ProjectCandidateStatus.RULE
      && !p.isCandidate))
      .sort((a, b) => (b.score - a.score))
      .sort((a, b) => (b.candidateRuleScore! - a.candidateRuleScore!))
      .map(d => d);

    // console.log(candProjectsByRule, greyProjects, nonCandProjectsByRule);

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
            {this.props.criteria.map((d: any, i: number) => (
              <b key={i} style={{ color: darkColors[i] }}>{i + 1} </b>
            ))}
          </div>
          <div className="score">
            <b>SCORE BAR<br />(Min:-100, Max:100)</b>
          </div>
          <div>
            <div className="bars" style={{ justifyContent: "flex-left" }}>
              {
                criteria.map((c, i) => (
                  <div key={i} className="attributes">
                    <div style={{
                      margin: "2px",
                      fontWeight: "bold",
                      textAlign: "center",
                      width: 60 * c.weight,
                      backgroundColor: colors[i]
                    }}>
                      {c.weight !== 0 ? c.name : ""}
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="bars">
              <div className="header-bars" />
              <div className="cand-separator" style={{ height: '30px' }} />
              <div className="header-bars" />
            </div>
          </div>
        </div>
        <div className="cand-zone">
          {
            // sorting 
            // cand - grey - noncand
            candProjectsByRule.map((prj: ProjectInterface, i: number) =>
              <ProjectItem
                project={prj}
                criteria={criteria}
                candThreshold={thresholdScore}
                key={i} />
            )
          }
        </div>
        <div className="separator">
          <div className="slider-title">Set Threshold Score</div>
          <div className="slider-container">
            <div className="drag-region"  onMouseDown={this.mouseDownOnThresholdBar}/>
            <div className="candidate-region-indicator"
              style={{
                width: (100 - thresholdScore) + "%",
                left: thresholdScore + "%"
              }}
            />
            <div className="indicator-text current-score" style={{
              left: thresholdScore + "%"
            }}>{Math.round(thresholdScore * 100)/100}</div>
            <div className="indicator-text min-score">0</div>
            <div className="indicator-text max-score">100</div>
            <div className="indicator-icon" style={{
              left: thresholdScore + "%"
            }}/>

          </div>
        </div>
        <div className="grey-zone">
          {
            // sorting 
            // cand - grey - noncand
            greyProjects.map((prj: ProjectInterface, i: number) =>
              <ProjectItem
                project={prj}
                criteria={criteria}
                candThreshold={thresholdScore}
                key={i} />
            )
          }
        </div>
        <div className="separator" />
        <div className="noncand-zone">
          {
            // sorting 
            // cand - grey - noncand
            nonCandProjectsByRule.map((prj: ProjectInterface, i: number) =>
              <ProjectItem
                project={prj}
                criteria={criteria}
                candThreshold={thresholdScore}
                key={i} />
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