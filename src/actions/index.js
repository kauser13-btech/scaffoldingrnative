import { getQueueInstance } from "../queue/queueInstance";
import { readImageDataFromUrl } from "../Utils/fs";

export const FETCH_WALLET = 'FETCH_WALLET';
export const FETCH_PROFILE = 'FETCH_PROFILE';
export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const LOGOUT = 'LOGOUT';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_APPEND = 'FETCH_POST_APPEND';
export const MAKE_POST = 'MAKE_POST';
export const MAKE_IMAGE = 'MAKE_IMAGE';

export const INITIATE_QUEUE = 'INITIATE_QUEUE';

export const loginSubmit = (username, password) => {
    return {
        type: LOGIN_SUBMIT,
        payload: {
            request: {
                url: 'api/v1/login',
                method: 'post',
                data: {
                    username,
                    password,
                },
            },
        },
    };
};

export const triggerLogout = () => {
    return {
        type: LOGOUT,
    };
};

export const fetchProfile = () => {
    return {
        type: FETCH_PROFILE,
        payload: {
            request: {
                url: `api/v1/user`,
                method: 'get',
            },
        },
    };
};


export const fetchPosts = (page = 1) => {
    return {
        type: FETCH_POST,
        payload: {
            request: {
                url: `api/v1/posts?page=${page}`,
                method: 'get',
            },
        },
    };
};






export const makePost = (post) => {

    return {
        type: MAKE_POST,
        payload: {
            request: {
                url: 'api/v1/posts',
                method: 'post',
                data: post,
            },
        },
    };
};


export const makeImage = (data) => {

    return {
        type: MAKE_IMAGE,
        payload: {
            request: {
                url: 'api/v1/posts/images',
                method: 'post',
                data: data,
            },
        },
    };
};


async function CreateImageUpload(dispatch, getState, id, image) {


    try {
        const imageData = await readImageDataFromUrl(image.url);



        if (imageData == '') {

            // return await dispatch(RemoveQueue(image));
            throw Error('issue uploading failed');
        }
        const response = await dispatch(
            makeImage(
                {
                    data: imageData,
                    post_id: image.post_id
                }
            ),
        );

        if (response.type !== 'MAKE_IMAGE_SUCCESS') {
            throw Error('issue uploading failed');
        }



        const url = isIOS() ? getFileReadPath(image.url) : image.url;
        await RNFetchBlob.fs.unlink(url);



    } catch (e) {


        throw e;
    }
}

export const createPost = async (dispatch, getState, post) => {
    await dispatch(
        makePost(post),
    );
}



export const createImage = async (dispatch, getState, post) => {
    await dispatch(
        makeImage(post),
    );
}

export const registerQueue = () => async (dispatch, getState) => {

    const queue = await getQueueInstance();
    queue.addWorker(
        'create-post',
        async (id, post) => await createPost(dispatch, getState, post),
        { concurrency: 2 },
    );


    queue.addWorker(
        'create-image',
        async (id, post) => await createImage(dispatch, getState, image),
        { concurrency: 2 },
    );

    queue.start();

    queue.workersAdded = true;
    // dispatch action save in redux queue.isStarted
};



export function* syncPostJobCreator({ type, payload }) {
    const queue = yield call(getQueueInstance);
    if (!queue.workersAdded) {
        return;
    }
    queue.createJob('create-post', post, { attempts: 4 });
}


export function* syncImageJobCreator(image) {
    const queue = yield call(getQueueInstance);
    if (!queue.workersAdded) {
        return;
    }
    queue.createJob('create-image', image, { attempts: 4 });
}


