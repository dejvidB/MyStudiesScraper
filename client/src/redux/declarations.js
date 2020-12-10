import * as ActionTypes from './ActionTypes';

export const Declarations = (state = {
    declarations: {},
    declarations_open: false
}, action) => {
    switch (action.type){
        case ActionTypes.SET_DECLARATIONS:
            return {...state, declarations: action.payload};
        case ActionTypes.SET_DECLARATIONS_OPEN:
            return {...state, declarations_open: action.payload};
        default:
            return state;
    }
}
