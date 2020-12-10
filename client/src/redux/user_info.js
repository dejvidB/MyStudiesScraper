import * as ActionTypes from './ActionTypes';

export const User_info = (state = {
    user_info: {},
    terms: 0
}, action) => {
    switch (action.type) {
        case ActionTypes.SET_USER_INFO:
            return {...state, user_info: action.payload};
        case ActionTypes.SET_TERMS:
            return {...state, terms: action.payload};
        default:
          return state;
      }
};
