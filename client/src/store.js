import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleWare = [thunk];

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleWare),
    // other store enhancers if any
));

export default store;