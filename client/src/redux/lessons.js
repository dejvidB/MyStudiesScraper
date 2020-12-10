import * as ActionTypes from './ActionTypes';

export const Lessons = (state = {
    lessons: {}
}, action) => {
    switch (action.type){
        case ActionTypes.SET_LESSONS:
            return {...state, lessons: action.payload};
        default:
            return state;
    }
}
