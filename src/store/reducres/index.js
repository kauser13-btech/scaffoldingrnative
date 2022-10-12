import { combineReducers } from 'redux';
import { approvalReducer } from './approvalReducer';
import { draftReducer } from './draftReducer';
import { loginReducer } from './loginReducer';
import { postReducer } from './postReducer';

export default combineReducers({
    auth: loginReducer,
    posts: postReducer,
    draft: draftReducer,
    approvals: approvalReducer
});
