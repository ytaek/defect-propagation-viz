import { CriterionInterface, CriterionValueInterface } from 'src/services/DataService';
import { string } from 'prop-types';

// types
export interface CriteriaState {
  criteria: CriterionInterface[];
}

export const INSERT_WEIGHT = "criteria/INSERT_WEIGHT";
export const DELETE_WEIGHT = "criteria/DELETE_WEIGHT";
export const TOGGLE_WEIGHT = "criteria/TOGGLE_WEIGHT";

interface InsertWeightAction {
  type: typeof INSERT_WEIGHT;
  payload: number;
}

interface DeleteWeightAction {
  type: typeof DELETE_WEIGHT;
  payload: number;
}

interface ToggleWeightAction {
  type: typeof TOGGLE_WEIGHT;
  payload: {
    criterionValueInterface: CriterionValueInterface
  };
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

function toggleWeight(cv: CriterionValueInterface) {
  console.log("CALLED Toggle Weight");
  return {
    type: TOGGLE_WEIGHT,
    // payload: {
    //   name: cv.name,
    //   weight: cv.weight,
    //   status: cv.status,
    //   criterion: cv.cri
    // }
  }
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