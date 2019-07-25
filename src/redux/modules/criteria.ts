import { CriterionInterface, CriterionValueInterface, CriterionValueStatus } from 'src/services/DataService';
import update from 'react-addons-update';
// import { csv } from 'd3';

// types
export interface CriteriaState {
  criteria: CriterionInterface[];
}

export const SET_WEIGHT = "criteria/SET_WEIGHT";
export const VALUE_TOGGLE_WEIGHT = "criteria/VALUE_TOGGLE_WEIGHT";
export const VALUE_SET_WEIGHT = "criteria/VALUE_SET_WEIGHT";

interface SetWeightAction {
  type: typeof SET_WEIGHT;
  payload: {
    criterion: CriterionInterface
  }
}

interface ValueToggleWeightAction {
  type: typeof VALUE_TOGGLE_WEIGHT;
  payload: {
    criterionValue: CriterionValueInterface
  };
}

interface ValueSetWeightAction {
  type: typeof VALUE_SET_WEIGHT;
  payload: {
    criterionValue: CriterionValueInterface
  }
}


export type CriteriaActionTypes =
  SetWeightAction
  | ValueToggleWeightAction
  | ValueSetWeightAction
  ;

// actions

function setWeight(c: CriterionInterface) {
  return {
    type: SET_WEIGHT,
    payload: {
      criterion: c
    }
  }
}

function valueToggleWeight(cv: CriterionValueInterface) {
  const nextStatus = (cv.status + 1) % (Object.keys(CriterionValueStatus).length / 2) + 1;
  cv.status = nextStatus;
  if (cv.status !== CriterionValueStatus.WEIGHT) {
    cv.weight = 0;
  }
  // test code
  else {
    console.log("UNEXPECTED ROUTE");
  }
  
  return {
    type: VALUE_TOGGLE_WEIGHT,
    payload: {
      criterionValue: cv
    }
  }
}

function valueSetWeight(cv: CriterionValueInterface) {
  return {
    type: VALUE_SET_WEIGHT,
    payload: {
      criterionValue: cv
    }
  }
}

export const criteriaActionCreators = {
  setWeight,
  valueToggleWeight,
  valueSetWeight
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
    case SET_WEIGHT:
console.log("SET_WEIGHT!!")
      return {
        criteria: update(
          state.criteria,
          {
            [action.payload.criterion.id]: {
              weight: { $set: action.payload.criterion.weight}
            }
          }
        )
      }
    case VALUE_TOGGLE_WEIGHT:
      return {
        criteria: update(
          state.criteria,
          {
            [action.payload.criterionValue.criterion!.id]: {
              values: {
                [action.payload.criterionValue.id]: {
                  status: { $set: action.payload.criterionValue.status },
                  weight: { $set: action.payload.criterionValue.weight }
                }
              }
            }
          }
        )
      }
    case VALUE_SET_WEIGHT:
      return {
        criteria: update(
          state.criteria,
          {
            [action.payload.criterionValue.criterion!.id]: {
              values: {
                [action.payload.criterionValue.id]: {
                  weight: { $set: action.payload.criterionValue.weight }
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