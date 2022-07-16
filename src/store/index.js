import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, compose, createStore } from 'redux';
import { multiClientMiddleware } from 'redux-axios-middleware';
import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga';
import { axiosClient, axiosMiddlewareConfig } from '../api/axiosClient';
import { rootSaga } from '../sagaConfig';
import rootReducer from './reducres';
import reduxThunk from 'redux-thunk';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middlewares = [

    multiClientMiddleware({
        default: { client: axiosClient, options: axiosMiddlewareConfig },
    }), sagaMiddleware, reduxThunk
];

let storeEnhancers = compose(applyMiddleware(...middlewares));

// if (__DEV__) {
//   const Reactotron = require('../ReactotronConfig').default;
//   storeEnhancers = compose(
//     applyMiddleware(...middlewares),
//     Reactotron.createEnhancer(),
//   );
// }

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    version: 1,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    initialState,
    storeEnhancers,
);

store.subscribe(() => { });
sagaMiddleware.run(rootSaga);
// export const rehydrateStore = cb => persistStore(store, null, cb);

export const rehydrateStore = persistStore(store);
