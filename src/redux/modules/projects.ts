import { ProjectInterface, CriterionInterface, ProjectAttributes, CriterionValueStatus } from 'src/services/DataService';

// types
export interface ProjectsState {
  projects: ProjectInterface[];
}

export const CALCULATE_SCORE = "project/CALCULATE_SCORE";

interface CalculateScoreAction {
  type: typeof CALCULATE_SCORE;
  payload: {
    criteria: CriterionInterface[]
  };
}

export type ProjectsActionTypes = 
  | CalculateScoreAction
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

export const projectsActionCreators = {
  calculateScore,
}

// reducers

const initialState: ProjectsState = {
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
        }, 0);
        proj.score = score;
        return proj;
      });
      return {
        projects: newProjects
      };
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
