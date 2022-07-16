import queueFactory from 'react-native-queue';

let queue;

export async function getQueueInstance() {
    return new Promise((resolve, reject) => {
        if (queue) return resolve(queue);
        return queueFactory()
            .then((q) => {
                queue = q;
                resolve(queue);
            })
            .catch((e) => reject(e));
    });
}
