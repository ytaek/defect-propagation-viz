import { CriterionInterface, CriterionValueInterface, CriterionValueStatus } from 'src/services/DataService';
import update from 'react-addons-update';
import { curveBasisClosed } from 'd3';
// import { csv } from 'd3';

// types
export interface CriteriaState {
  criteria: CriterionInterface[];
  inferredWeights: {};
}

export const SET_WEIGHT = "criteria/SET_WEIGHT";
export const VALUE_TOGGLE_WEIGHT = "criteria/VALUE_TOGGLE_WEIGHT";
export const VALUE_SET_WEIGHT = "criteria/VALUE_SET_WEIGHT";
export const SET_WEIGHT_INFERENCE = "criterai/SET_WEIGHT_INFERENCE";

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

interface SetWeightInference {
  type: typeof SET_WEIGHT_INFERENCE;
  payload: {
    cvWeightMap: {},
  }
}


export type CriteriaActionTypes =
  SetWeightAction
  | ValueToggleWeightAction
  | ValueSetWeightAction
  | SetWeightInference
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
      criterionValue: cv,
    }
  }
}

function setWeightInference(cvw: any) {
  return {
    type: SET_WEIGHT_INFERENCE,
    payload: {
      cvWeightMap: cvw
    }
  }
}

export const criteriaActionCreators = {
  setWeight,
  valueToggleWeight,
  valueSetWeight,
  setWeightInference,
}

// reducers

const initialState: CriteriaState = {
  criteria: [],
  inferredWeights: {},
}

export function criteriaReducer(
  state = initialState,
  action: CriteriaActionTypes
): CriteriaState {
  switch (action.type) {
    case SET_WEIGHT:
console.log("SET_WEIGHT!!")
      // return update(state, {
      //   criteria: update(
      //     state.criteria,
      //     {
      //       [action.payload.criterion.id]: {
      //         weight: { $set: action.payload.criterion.weight}
      //       }
      //     }
      //   )
      // });
      return update(state, {criteria: {$set:update(
          state.criteria,
          {
            [action.payload.criterion.id]: {
              weight: { $set: action.payload.criterion.weight}
            }
          }
        )
      }});
    case VALUE_TOGGLE_WEIGHT:
      return update(state, {
        criteria: {$set:update(
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
      }});
    case VALUE_SET_WEIGHT:
      return update(state, {
        criteria: {$set:update(
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
      }});
    case SET_WEIGHT_INFERENCE:
      return update(state, {inferredWeights: {$set:action.payload.cvWeightMap}});
    default:
      return state;
  }
}