// homepage logic
import axios from 'axios';

// actionType
const GET_LIST = 'INDEX/USER_INFO';

// actionCreator
const changeUserInfo = data => ({
    type: GET_LIST,
    data: data
});

export const getUserInfo = server => {
    return (dispatch, getState, axiosInstance) => {
        return axios.get('http://localhost:9090/api/user/info')
            .then(res => {
                const {data} = res.data;
                console.log('User info', data);
                dispatch(changeUserInfo(data));
            }).catch(e => {
                console.error('Error thrown from user.js', e);
            });
    }
};

const defaultState = {
    userInfo: []
};

export default (state = defaultState, action) => {
    if (action.type === GET_LIST) {
        return {
            ...state,
            userInfo: action.data
        };
    } else {
        return state;
    }
};