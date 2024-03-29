import { combineReducers } from 'redux';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    // Add other reducers here if needed
});

export default rootReducer;