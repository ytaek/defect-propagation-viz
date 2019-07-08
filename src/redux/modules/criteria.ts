import { CriterionInterface, CriterionValueInterface } from 'src/services/DataService';
import update from 'react-addons-update';

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
    criterionValue: CriterionValueInterface
  };
}

export type CriteriaActionTypes = 
  | InsertWeightAction
  | DeleteWeightAction
  | ToggleWeightAction
  ;

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
  console.log("CALLED Toggle Weight", cv);

  let w = 0;
  const { weight } = cv;

  if (weight === 0) {
      w = 0.5;
  } else if (weight === 0.5) {
      w = 1;
  } else {
      w = 0;
  }
  cv.weight = w;

  return {
    type: TOGGLE_WEIGHT,
    payload: {
      criterionValue: cv
    }
  }
}

export const criteriaActionCreators = {
  insertWeight,
  deleteWeight,
  toggleWeight
}

// reducers

const initialState: CriteriaState = {
  criteria: [],
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
    case TOGGLE_WEIGHT:
      return {
        criteria: update(
          state.criteria,
          {
            [action.payload.criterionValue.criterion!.id]: {
              values: {
                [action.payload.criterionValue.id]: {
                  weight: {$set: action.payload.criterionValue.weight}
                }  
              }
            }
          }
        )
      }
    default:
      return state;
  }
}