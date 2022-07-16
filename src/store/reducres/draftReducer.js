import { INITIATE_QUEUE, MAKE_POST } from '../../actions';

const initialState = {
    queue: []
};

export function draftReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case INITIATE_QUEUE: {
            return {
                ...state,
                data: [...state.data]

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
