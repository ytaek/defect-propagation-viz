import * as React from "react";
import { connect } from "react-redux";
import { ProjectInterface } from 'src/DataService';
import { projectsActionCreators } from 'src/redux/modules/projects';
import { bindActionCreators } from 'redux';
import { StoreState } from 'src/redux/modules';
import ProjectList from 'src/components/ProjectList';

interface Props {
    projectsData: ProjectInterface[];
    projectsActions: typeof projectsActionCreators;
}

class ProjectListContainer extends React.Component<Props> {
    render() {
console.log("ProjectListContainer", this.props);

        return (
          <ProjectList
            projects={this.props.projectsData} 
            onOrder={this.onOrder} 
          />
        );
    }

    onOrder = (): void => {
        const { projectsActions } = this.props;
        projectsActions.order();
    }
}

const mapStateToPros = (state: StoreState) => ( {
    projects: state.projects
});

const mapDispatchToPros = (dispatch: any) => ( {
    projectsActions: bindActionCreators(projectsActionCreators, dispatch)
});

export default connect(
    mapStateToPros,
    mapDispatchToPros
)(ProjectListContainer);