import { ProjectInterface } from 'src/DataService';

// types
export interface ProjectsState {
  projects: ProjectInterface[];
}

export const ORDER = "project/ORDER";

interface OrderAction {
  type: typeof ORDER;
  payload: number;
}

export type CriteriaActionTypes = 
  | OrderAction;

// actions

function order() {
  console.log("ORDER");
  return {
    type: ORDER,
    payload: {}
  };
}

export const projectsActionCreators = {
  order,
}

// reducers

const initialState: ProjectsState = {
  projects: []
}

export function projectReducer(
  state = initialState,
  action: CriteriaActionTypes
): ProjectsState {
  switch (action.type) {
    case ORDER:
      return {
        projects: [...state.projects]
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
