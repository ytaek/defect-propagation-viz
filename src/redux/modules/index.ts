import { combineReducers } from 'redux';
import { CriteriaState, criteriaReducer as criteria } from './criteria';

export interface StoreState {
    criteria: CriteriaState;
}

const reducers = combineReducers<StoreState>({
    criteria
});

export default reducers;