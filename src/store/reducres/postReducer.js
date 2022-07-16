import { FETCH_POST, MAKE_POST } from '../../actions';

const initialState = {

};

export function postReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case `${MAKE_POST}_SUCCESS`: {
            return {
                ...state,
                data: [payload.data.data, ...state.data]

            };
        }
        case `${FETCH_POST}_SUCCESS`: {
            return {
                ...state,
                data: payload['data']['pagination']['current_page'] > 1 ? [...state.data, ...payload.data.data] : payload.data.data,
                pagination: payload['data']['pagination']
            };
        }



        default:
            return state;
    }
}
