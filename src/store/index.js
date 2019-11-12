import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import rootReducer from '../reducers/rootReducers';

const middleware = [thunk];

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware)),
);