import { FETCH_POST, MAKE_POST, MAKE_IMAGE } from '../../actions';

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



        case `${MAKE_IMAGE}_SUCCESS`: {
            return {
                ...state,
                data: state.data.map(post => {
                    return post.id === payload.data.data.post_id ? {
                        ...post, images: post['images'] && post['images'].length > 0 ? [...post['images'], payload.data.data] : [payload.data.data]
                    } : post
                })

            };
        }

        default:
            return state;
    }
}
