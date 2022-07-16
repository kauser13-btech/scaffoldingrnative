import { LOGIN_SUBMIT, LOGOUT, FETCH_PROFILE } from '../../actions';

const initialState = {

};

export function loginReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case `${LOGIN_SUBMIT}_SUCCESS`: {
            return {
                ...state,
                ...payload.data.data,
            };
        }

        case `${LOGIN_SUBMIT}_FAIL`:
            const { access_token = '', message = '' } =
                action?.error?.response?.data || {};

            return state;

        case LOGOUT:
            return initialState;

        case `${FETCH_PROFILE}_SUCCESS`:
            return {
                ...state,
                profile: payload.data.data,
            };

        default:
            return state;
    }
}
