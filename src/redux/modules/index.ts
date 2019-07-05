import { combineReducers } from 'redux';
import { CriteriaState, criteriaReducer } from './criteria';
import { projectReducer, ProjectsState } from './projects';

export interface StoreState {
    criteriaState: CriteriaState;
    projectsState: ProjectsState;
}

const reducers = combineReducers<StoreState>({
    criteriaState: criteriaReducer,
    projectsState: projectReducer
});

export default reducers; 