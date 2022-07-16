import axios from 'axios';
import { Navigation } from 'react-native-navigation';
import Config from "react-native-config";
import { triggerLogout } from '../actions';

const axiosClient = axios.create({
    baseURL: "https://scaffolding.btechbd.xyz/",
    timeout: 15000,
    headers: {
        Accept: 'application/json',
    },
});

const axiosMiddlewareConfig = {
    returnRejectedPromiseOnError: true,
    interceptors: {
        request: [
            {
                success: function ({ getState, dispatch, getSourceAction }, req) {
                    const { api_token } = getState().auth;
                    const headers = {
                        ...(!!api_token && { Authorization: `Bearer ${api_token}` }),
                    };

                    req.headers = {
                        ...req.headers,
                        ...headers,
                    };
                    return req;
                },
                error: function ({ getState, dispatch, getSourceAction }, error) {
                    return Promise.reject(error);
                },
            },
        ],
    },
    onError: ({ action, next, error, getState, dispatch }, actionOptions) => {

        console.log('sss');
        console.log(Config.API_URL);
        let errorObject;
        if (!error.response) {
            errorObject = {
                data: error.message,
                status: 0,
            };

            if (__DEV__) {
                console.log('HTTP Failure in Axios', error);
            }
        } else {
            errorObject = error;

            if (__DEV__) {
                console.log('Http Failure', error);
            }
        }

        const nextAction = {
            type: `${action.type}_FAIL`,
            error: errorObject,
            meta: {
                previousAction: action,
            },
        };
        // console.log(error);
        next(nextAction);

        const message = error?.response?.data?.message || '';
        if (error?.response?.status === 401) {
            const message = error?.response?.data?.message || '';
            if (message == 'Unauthenticated.') {
                dispatch(triggerLogout());
                // registerLogin();
                return;
            }
        }

        return nextAction;
    },
};

export { axiosClient, axiosMiddlewareConfig };
