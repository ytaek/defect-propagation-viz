import { CriterionInterface } from 'src/DataService';

// types
export interface CriteriaState {
  criteria: CriterionInterface[];
}

export const INSERT_WEIGHT = "criteria/INSERT_WEIGHT";
export const DELETE_WEIGHT = "criteria/DELETE_WEIGHT";

interface InsertWeightAction {
  type: typeof INSERT_WEIGHT;
  payload: number;
}

interface DeleteWeightAction {
  type: typeof DELETE_WEIGHT;
  payload: number;
}

export type CriteriaActionTypes = 
  | InsertWeightAction
  | DeleteWeightAction;

// actions

function insertWeight() {
  console.log("CALLED INSERT WEIGHT");
  return {
    type: INSERT_WEIGHT,
    payload: {}
  };
}

function deleteWeight() {
  console.log("CALLED DELETE WEIGHT");
  return {
    type: DELETE_WEIGHT,
    payload: {}
  };
}

export const actionCreators = {
  insertWeight,
  deleteWeight
}

// reducers

const initialState: CriteriaState = {
  criteria: []
}

export function criteriaReducer(
  state = initialState,
  action: CriteriaActionTypes
): CriteriaState {
  switch (action.type) {
    case INSERT_WEIGHT:
      return {
        criteria: [...state.criteria]
      };
    case DELETE_WEIGHT:
      return {
        criteria: [...state.criteria]
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
