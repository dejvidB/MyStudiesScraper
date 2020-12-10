import * as ActionTypes from './ActionTypes';

export const Grades = (state = {
    grades: {}
}, action) => {
    switch (action.type){
        case ActionTypes.SET_GRADES:
            return {...state, grades: action.payload};
        default:
            return state;
    }
}
