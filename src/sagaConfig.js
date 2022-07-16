
import { all, put, takeEvery } from 'redux-saga/effects';
import { FETCH_PROFILE, registerQueue } from './actions';
import { axiosClient } from './api/axiosClient';





function* queueSaga() {
    yield takeEvery(`${FETCH_PROFILE}_SUCCESS`, function* () {
        yield put(registerQueue());
    });
}

// function* heartBeatSaga() {
//     yield takeEvery(types.BOOT_SAGA, autoSyncNetInfoSaga);
//     yield takeEvery(types.HEARTBEAT, autoSyncNetInfoSaga);
//     yield takeEvery(types.HEARTBEAT, autoCleanupDraftUploadQueue);
//     yield takeEvery(types.HEARTBEAT, autoSyncOnWifi);
// }

export function* rootSaga() {
    yield all([
        // createRequestInstance({ driver }),
        // watchRequests(),

        queueSaga(),
        // heartBeatSaga(),
    ]);
}
