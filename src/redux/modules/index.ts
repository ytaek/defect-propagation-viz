import { combineReducers } from 'redux';
import { CriteriaState, criteriaReducer } from './criteria';
import { projectReducer, ProjectsState } from './projects';

export interface StoreState {
    criteria: CriteriaState;
    projects: ProjectsState;
}

const reducers = combineReducers<StoreState>({
    criteria: criteriaReducer,
    projects: projectReducer
});

export default reducers;