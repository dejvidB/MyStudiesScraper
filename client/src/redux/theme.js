import { SWITCH_THEME } from './ActionTypes';

export const Theme = (state = {
    theme: "dark"
}, action) => {
    switch (action.type){
        case SWITCH_THEME:
            return {...state, theme: state.theme === "light" ? "dark" : "light"};
        default:
            return state;
    }
}
