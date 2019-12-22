import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getIndexList} from '../store/index';
import styles from './Index.css';
import withStyle2 from '../withStyle';

// console.log('_getCss:', styles._getCss());

function Index(props) {
    const [count, setCount] = useState(1);
    // async data display on homepage
    useEffect(() => {
        if (!props.list.length) {
            // to fetch data from client side
            props.getIndexList();
        }
    }, []);
    return (<div className={styles.container}>
        <h1 className={styles.title}>Hello {props.title} ! {count}</h1>
        <button onClick={() => setCount(count + 1)}>累加</button>
        <hr/>
        <ul>
            {props.list.map(item => {
                return <li key={item.id}>{item.name}</li>
            })}
        </ul>
    </div>);
}

Index.loadData = (store) => {
    return store.dispatch(getIndexList());
};

export default connect(
    state => ({list: state.index.list}),
    {getIndexList}
)(withStyle2(Index, styles));