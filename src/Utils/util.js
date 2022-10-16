import { Platform } from 'react-native';
import differenceInSeconds from "date-fns/differenceInSeconds";


export const QUEUE_TIMEOUT = 60 * 5;
export const UPLOAD_TIMEOUT = 60;



export const secondsSince = (date, now = new Date()) => {
    return differenceInSeconds(now, new Date(date));
}


export const shouldProcessItem = (item) => {
    const { queued_at, upload_started_at } = item;
    if (queued_at && secondsSince(queued_at) >= QUEUE_TIMEOUT) {
        return true;
    }

    if (upload_started_at) {
        const timePassedSinceUploadStarted = secondsSince(upload_started_at);
        if (timePassedSinceUploadStarted >= UPLOAD_TIMEOUT) return true;
        if (timePassedSinceUploadStarted <= UPLOAD_TIMEOUT) return false;
    }

    if (queued_at) return false;
    return true; // untouched
}

export const isIOS = () => {
    return Platform.OS === 'ios';
};



export const getPost = (approvals, post_id) => {
    let post = null;
    for (let i = 0; i < 3; i++) {
        if (approvals[i]) {
            post = approvals[i].find(approval => {
                return approval['id'] === post_id;
            });
        }
        if (post)
            break;
    }
    return post;
}