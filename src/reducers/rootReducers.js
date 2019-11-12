import { combineReducers } from 'redux';

import login from './login';
import search from './search';

const rootReducer = combineReducers({
    login,
    search
});

export default rootReducer;