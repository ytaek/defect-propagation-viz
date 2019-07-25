import { ProjectInterface, CriterionInterface, ProjectAttributes, CriterionValueStatus } from 'src/services/DataService';
import update from 'react-addons-update';

// types
export interface ProjectsState {
  projects: ProjectInterface[];
  thresholdScore: number;
  nonCandThresholdScore: number;
}

export const CALCULATE_SCORE = "project/CALCULATE_SCORE";
export const SET_CAND_THRESHOLD = "project/SET_CAND_THRESHOLD";
export const SET_NONCAND_THRESHOLD = "project/SET_NONCAND_THRESHOLD";

interface CalculateScoreAction {
  type: typeof CALCULATE_SCORE;
  payload: {
    criteria: CriterionInterface[]
  };
}

interface SetCandThreshold {
  type: typeof SET_CAND_THRESHOLD;
  payload: {
    thresholdScore: number;
  }
}

interface SetNonCandThreshold {
  type: typeof SET_NONCAND_THRESHOLD;
  payload: {
    nonCandThresholdScore: number;
  }
}

export type ProjectsActionTypes = 
  | CalculateScoreAction
  | SetCandThreshold
  | SetNonCandThreshold
  ;


// actions

function calculateScore(cr: CriterionInterface[]) {
  console.log("calculateScore function called");

  return {
    type: CALCULATE_SCORE,
    payload: {
      criteria: cr
    }
  };
}

function setCandThreshold(th: number) {
  return {
    type: SET_CAND_THRESHOLD,
    payload: {
      thresholdScore: th
    }
  }
}

function setNonCandThreshold(th: number) {
  return {
    type: SET_NONCAND_THRESHOLD,
    payload: {
      nonCandThresholdScore: th
    }
  }
}

export const projectsActionCreators = {
  calculateScore,
  setCandThreshold,
  setNonCandThreshold
}

// reducers

const initialState: ProjectsState = {
  thresholdScore: 0,
  nonCandThresholdScore: 0,
  projects: []
}

export function projectReducer(
  state = initialState,
  action: ProjectsActionTypes
): ProjectsState {
  switch (action.type) {
    case CALCULATE_SCORE:
      const newProjects = state.projects.map( (proj) => {
        const score = Object.keys(new ProjectAttributes()).reduce( (prev: number, name: string) => {
          const cv = action.payload.criteria.filter(d => (d.name === name))[0]
                    .values.filter(d => d.name === proj.attributes[name])[0];
          if (cv.status === CriterionValueStatus.WEIGHT) {
            prev += cv.weight;
          }
          return prev;
        }, 0) / action.payload.criteria.length;
        proj.score = score;
        return proj;
      });
      return update(state, {projects: {$set:newProjects}});
    case SET_CAND_THRESHOLD:
      return update(state, {thresholdScore: {$set:action.payload.thresholdScore}});
    case SET_NONCAND_THRESHOLD:
        return update(state, {nonThresholdScore: {$set:action.payload.nonCandThresholdScore}});
    default:
      return state;
  }
}

// import { createAction, handleActions } from "redux-actions";

// // Actions
// const INSERT_WEIGHT = "criteria/INSERT_WEIGHT";
// const DELETE_WEIGHT = "criteria/DELETE_WEIGHT";

// export const actionCreators = {
//   insert: createAction(INSERT_WEIGHT),
//   delete: createAction(DELETE_WEIGHT)
// };

// export interface CriterionState {
//   weights: any;
//   criterionWeight: number;
// }

// const initialState: CriterionState = {
//   weights: {},
//   criterionWeight: 1
// };

// // Reducers
// export default handleActions<CriterionState, number>(
//   {
//     [INSERT_WEIGHT]: (state, action) => {
//       console.log(state);
//       return { ...state, weights: undefined, criterionWeight: action.payload };
//     }
//     // [INSERT_WEIGHT]: (state, w, cw) => ({ state.weights = w; state.criterionWeight = cw; }),
//     // [DELETE_WEIGHT]:state => ({ value: state.value - 1 })
//     // [INCREMENT]: (state) => ({ value: state.value + 1 }),
//   },
//   initialState
// );
