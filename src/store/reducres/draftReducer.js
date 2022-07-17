import { INITIATE_QUEUE, REGISTER_QUEUE, UPLOAD_START, REQUEUE, REMOVE_QUEUE } from '../../actions';

const initialState = {
    queue: []
};

export function draftReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case INITIATE_QUEUE: {
            return {
                ...state,
                queue: [...state.queue, payload.data]

            };
        }
        case REGISTER_QUEUE: {
            return {
                ...state,
                queue: state.queue.map(item => {
                    return item.id === payload.data.id ? { ...item, queued_at: new Date() } : item
                })

            };
        }

        case UPLOAD_START: {
            return {
                ...state,
                queue: state.queue.map(item => {
                    return item.id === payload.data.id ? { ...item, upload_started_at: new Date() } : item
                })

            };
        }


        case REQUEUE: {
            return {
                ...state,
                queue: state.queue.map(item => {
                    return item.id === payload.data.id ? { ...item, queued_at: null, upload_started_at: null } : item
                })

            };
        }

        case REMOVE_QUEUE: {
            console.log('In reomve');
            console.log(payload.data.id);
            // console.log(state.queue);

            return {
                ...state,
                queue: state.queue.filter(item => {
                    console.log(item.id == payload.data.id);
                    return item.id !== payload.data.id;
                })

            };
        }




        default:
            return state;
    }
}
