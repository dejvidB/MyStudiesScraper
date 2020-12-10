import * as ActionTypes from './ActionTypes';

export const Categories = (state = {}, action) => {
    switch (action.type){
        case ActionTypes.SET_CATEGORIES:
            return {...state, categories: action.payload};
        default:
            return state;
    }
}
