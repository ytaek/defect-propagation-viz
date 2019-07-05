import * as React from 'react';
import { ProjectInterface, CriterionValueInterface, CriterionValueStatus, CriterionInterface } from 'src/services/DataService';
import ProjectItem from './ProjectItem';
import './project.css';

interface Props {
  projects: ProjectInterface[];
  criteria: CriterionInterface[];
  onOrder(): void;
}

class ProjectList extends React.Component<Props> {
  render() {
    const candidateCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.CAND);
    const nonCandidateCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.NONCAND);
    const weightCriterionValueList = this.getCriterionValueListByStatus(CriterionValueStatus.WEIGHT);

    console.log("ProjectList", this.props);
    const { projects } = this.props;

    return (
      <div>
        <div><button onClick={this.props.onOrder}>TEST</button></div>
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
          <label className="name">NAME</label>
          <div className="status-value">
            CAND
          </div>
          <div className="status-value">
            NON-CAND
          </div>
          <div>
            WEIGHT
          </div>
        </div>
        {
          projects.map( (prj: ProjectInterface, i: number) => 
            <ProjectItem 
              project={prj} 
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