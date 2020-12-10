import {combineReducers, createStore} from 'redux';

import { User_info } from './user_info';
import { Categories } from './categories';
import { Lessons } from './lessons';
import { Grades } from './grades';
import { Declarations } from './declarations';
import { Theme } from './theme';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user_info: User_info,
            categories: Categories,
            lessons: Lessons,
            grades: Grades,
            declarations: Declarations,
            theme: Theme
        })
    );
    return store;
}
