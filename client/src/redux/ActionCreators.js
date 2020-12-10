import * as ActionTypes from './ActionTypes';

export const setUserInfo = user_info => ({
    type: ActionTypes.SET_USER_INFO,
    payload: user_info
});

export const setTerms = terms => ({
    type: ActionTypes.SET_TERMS,
    payload: terms
});

export const setCategories = categories => ({
    type: ActionTypes.SET_CATEGORIES,
    payload: categories
});

export const setLessons = lessons => ({
    type: ActionTypes.SET_LESSONS,
    payload: lessons
});

export const setGrades = grades => ({
    type: ActionTypes.SET_GRADES,
    payload: grades
});

export const setDeclarations = declarations => ({
    type: ActionTypes.SET_DECLARATIONS,
    payload: declarations
});

export const setDeclarationsState = dstate => ({
    type: ActionTypes.SET_DECLARATIONS_OPEN,
    payload: dstate
});

export const switchTheme = () => ({
    type: ActionTypes.SWITCH_THEME
});
