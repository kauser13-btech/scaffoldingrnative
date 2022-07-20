import { getQueueInstance } from "../queue/queueInstance";
import { getFileReadPath, readImageDataFromUrl } from "../Utils/fs";
import { call, put, select } from 'redux-saga/effects';
import { isIOS, shouldProcessItem } from "../Utils/util";
export const FETCH_WALLET = 'FETCH_WALLET';
export const FETCH_PROFILE = 'FETCH_PROFILE';
export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const LOGOUT = 'LOGOUT';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_APPEND = 'FETCH_POST_APPEND';
export const MAKE_POST = 'MAKE_POST';
export const MAKE_IMAGE = 'MAKE_IMAGE';
export const INITIATE_QUEUE = 'INITIATE_QUEUE';
export const REGISTER_QUEUE = 'REGISTER_QUEUE';
export const UPLOAD_START = 'UPLOAD_START';
export const REQUEUE = 'REQUEUE';
export const REMOVE_QUEUE = 'REMOVE_QUEUE';
export const HEARTBEAT = 'HEARTBEAT';
import queue, { Worker } from 'react-native-job-queue';

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
    // console.log(data);

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


export const InitiateToQueue = (data) => {

    return {
        type: INITIATE_QUEUE,
        payload: {
            data: data
        },
    };
};


export const pushToQueue = (data) => {

    return {
        type: REGISTER_QUEUE,
        payload: {
            data: data
        },
    };
};


export const processToQueue = (data) => {
    console.log("Inpro");
    console.log(data);

    return {
        type: UPLOAD_START,
        payload: {
            data: data
        },
    };
};


export const RemoveToQueue = (data) => {

    return {
        type: REMOVE_QUEUE,
        payload: {
            data: data
        },
    };
};


export const ReQueue = (data) => {

    return {
        type: REQUEUE,
        payload: {
            data: data
        },
    };
};


async function CreateImageUpload(dispatch, getState, image) {


    try {

        const imageData = await readImageDataFromUrl(image.url);
        console.log('In job');

        if (imageData == '' || imageData === undefined) {
            await dispatch(RemoveToQueue(image));
            // return await dispatch(RemoveQueue(image));
            throw Error('issue uploading failed');
        }
        await dispatch(processToQueue(image));
        const response = await dispatch(
            makeImage(
                {
                    // image: imageData,
                    image: `data:image/png;base64,${imageData}`,
                    post_id: image.post_id
                }
            ),
        );
        // console.log(response);

        if (response.type === 'MAKE_IMAGE_SUCCESS') {
            await dispatch(RemoveToQueue(image));
        }

        if (response.type !== 'MAKE_IMAGE_SUCCESS') {
            await dispatch(ReQueue(image));
            throw Error('issue uploading failed');
        }



        const url = isIOS() ? getFileReadPath(image.url) : image.url;
        await RNFetchBlob.fs.unlink(url);



    } catch (e) {
        await dispatch(ReQueue(data));
        console.log(e);
        throw e;
    }
}

export const createPost = async (dispatch, getState, post) => {
    await dispatch(
        makePost(post),
    );
}



export const createImage = async (dispatch, getState, image) => {
    try {

        const response = await dispatch(
            makeImage(image),
        );

    } catch (e) {

    }
}

export const registerQueue = () => async (dispatch, getState) => {

    // const queue = await getQueueInstance();
    // queue.addWorker(
    //     'create-post',
    //     async (id, post) => await createPost(dispatch, getState, post),
    //     { concurrency: 2 },
    // );


    queue.configure({
        onQueueFinish: (executed) => {
            console.log('FinishedQueue');
        }
    });


    queue.addWorker(new Worker("create-image", async (payload) => {
        return await CreateImageUpload(dispatch, getState, payload.image);
    }))


    // queue.addWorker(
    //     'create-image',
    //     async (id, image) => {
    //         console.log('Howdy');
    //         await CreateImageUpload(dispatch, getState, image)
    //     },
    //     { concurrency: 1 },
    // );

    // queue.start();

    // queue.workersAdded = true;
    // // dispatch action save in redux queue.isStarted
};



// export function* syncPostJobCreator({ type, payload }) {
//     const queue = yield call(getQueueInstance);
//     if (!queue.workersAdded) {
//         return;
//     }
//     queue.createJob('create-post', post, { attempts: 4 });
// }


export function* syncImageJobCreator({ type, payload }) {
    // const queue = yield call(getQueueInstance);
    // if (!queue.workersAdded) {
    //     return;
    // }

    const drafts = yield select((state) => state.draft.queue.filter(shouldProcessItem));

    for (let i in drafts) {

        yield put(pushToQueue(drafts[i]));
        queue.addJob('create-image', { image: drafts[i] });
    }

}


