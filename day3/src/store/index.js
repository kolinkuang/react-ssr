// homepage logic
// import axios from 'axios';
//import request

// actionType
const GET_LIST = 'INDEX/GET_LIST';

// actionCreator
const changeList = list => ({
    type: GET_LIST,
    list
});

export const getIndexList = server => {
    return (dispatch, getState, $axios) => {
        return $axios.get('/api/course/list')
            .then(res => {
                const {list} = res.data;
                console.log('list', list);
                dispatch(changeList(list));
            }).catch(e => {
                console.error('Error thrown', e);
            });
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