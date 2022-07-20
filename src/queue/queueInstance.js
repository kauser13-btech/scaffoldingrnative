import queue from 'react-native-job-queue';



export async function getQueueInstance() {
    return queue;
}
