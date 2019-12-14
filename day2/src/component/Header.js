import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return <div>
        <Link to="/">Home Page</Link> |
        <Link to="/about">About</Link>
    </div>
};