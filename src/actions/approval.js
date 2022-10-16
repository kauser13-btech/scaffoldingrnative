export const SAVE_APPROVAL = 'SAVE_APPROVAL';
export const SAVE_APPROVAL_ASSET = 'SAVE_APPROVAL_ASSET';
export const FETCH_APPROVAL = 'FETCH_APPROVAL';
export const CHAGE_APPROVAL_STATUS = 'CHAGE_APPROVAL_STATUS';
export const EDIT_ASSET = 'EDIT_ASSET';
export const UPDATE_APPROVAL_ASSET = 'UPDATE_APPROVAL_ASSET';

export const saveApproval = (data) => {
    return {
        type: SAVE_APPROVAL,
        payload: {
            request: {
                url: 'api/v1/approvals',
                method: 'post',
                data: data,
            },
        },
    };
};



export const saveApprovalAsset = (data) => {
    return {
        type: SAVE_APPROVAL_ASSET,
        payload: {
            request: {
                url: 'api/v1/approvals/asset',
                method: 'post',
                data: data,
            },
        },
    };
};


export const fetchApproval = (type = 0) => {
    return {
        type: FETCH_APPROVAL,
        approvals_type: type,
        payload: {
            request: {
                url: `api/v1/approvals?status=${type}`,
                method: 'get',
            },
        },
    };
};



export const changeApprovalStatus = (data, prev_status) => {
    return {
        type: CHAGE_APPROVAL_STATUS,
        approvals_type: prev_status,
        payload: {
            request: {
                url: `api/v1/approvals`,
                method: 'put',
                data: data,
            },
        },
    };
};



export const appendAsset = (data, id, approvals_type) => {
    return {
        type: APPENND_ASSET,
        payload: {
            data, id, approvals_type
        },
    };
};


export const EditAsset = (data, id, approvals_type) => {
    return {
        type: EDIT_ASSET,
        payload: {
            data, id, approvals_type
        },
    };
};



export const updateApprovalAsset = (data, prev_status) => {
    return {
        type: UPDATE_APPROVAL_ASSET,
        approvals_type: prev_status,
        payload: {
            request: {
                url: 'api/v1/approvals/asset',
                method: 'put',
                data: data,
            },
        },
    };
};


