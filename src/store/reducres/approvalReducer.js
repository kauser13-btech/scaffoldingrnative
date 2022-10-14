import { SAVE_APPROVAL, FETCH_APPROVAL, CHAGE_APPROVAL_STATUS, APPENND_ASSET, EDIT_ASSET } from '../../actions/approval';

const initialState = {};

export function approvalReducer(state = initialState, action) {
    const { type, payload, meta } = action;
    switch (type) {
        case `${SAVE_APPROVAL}_SUCCESS`: {
            return {
                ...state,
                [payload['data']['data']['status']]: state[payload['data']['data']['status']] ?
                    [...state[payload['data']['data']['status']], payload['data']['data']]
                    :
                    [payload['data']['data']]
            };
        }


        case `${FETCH_APPROVAL}_SUCCESS`: {
            return {
                ...state, [meta['previousAction']['approvals_type']]: payload['data']['data']
            };
        }



        case `${CHAGE_APPROVAL_STATUS}_SUCCESS`: {

            return {
                ...state,
                [meta['previousAction']['approvals_type']]: state[meta['previousAction']['approvals_type']].filter(approval => { return approval['id'] !== payload['data']['data']['id'] }),
                [payload['data']['data']['status']]: state[payload['data']['data']['status']] ? [...state[payload['data']['data']['status']], payload['data']['data']] : [payload['data']['data']]
            };
        }

        case APPENND_ASSET: {

            return {
                ...state,
                [payload['approvals_type']]: state[payload['approvals_type']].map(approval => {

                    return payload['id'] === approval['id'] ?
                        {
                            ...approval, assets: [payload['data'], ...approval['assets']]
                        } : approval;
                })
            };
        }


        case EDIT_ASSET: {

            return {
                ...state,
                [payload['approvals_type']]: state[payload['approvals_type']].map(approval => {

                    return payload['id'] === approval['id'] ?
                        {
                            ...approval, assets: approval['assets'].map(asset => {
                                return asset['id'] === payload['data']['id'] ? { ...asset, url: payload['data']['url'] } : asset
                            })
                        } : approval;
                })
            };
        }
        default:
            return state;
    }
}
