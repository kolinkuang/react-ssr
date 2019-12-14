// homepage logic
import axios from 'axios';

// actionType
const GET_LIST = 'INDEX/GET_LIST';

// actionCreator
const changeList = list => ({
    type: GET_LIST,
    list
});

export const getIndexList = server => {
    return (dispatch, getState, axiosInstance) => {
        return axios.get('http://localhost:9090/api/course/list')
            .then(res => {
                const {list} = res.data;
                dispatch(changeList(list));
            })
    }
};

const defaultState = {
    list: []
};

export default (state = defaultState, action) => {
    if (action.type === GET_LIST) {
        const newState = {
            ...state,
            list: action.list
        };
        return newState;
    } else {
        return state;
    }
};