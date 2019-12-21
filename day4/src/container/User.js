import React from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from '../store/user';
import {Redirect} from 'react-router-dom';

function User(props) {
    console.log('props.userinfo', props.userinfo);

    return <Redirect to='/about'></Redirect>;

    // return <div>
    //     <h1>
    //         Hello {props.userInfo.name}, your best man is{props.userInfo.best}
    //     </h1>
    // </div>;
}

User.loadData = store => {
    return store.dispatch(getUserInfo());
};

export default connect(
    state => ({userInfo: state.user.userInfo}),
)(User);