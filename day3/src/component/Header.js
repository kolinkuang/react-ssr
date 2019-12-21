import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return <div>
        <Link to="/">Home Page</Link> |
        <Link to="/about">About</Link> |
        <Link to="/user">User</Link> |
        <Link to='/wtf'>Not Found</Link> |
    </div>
};