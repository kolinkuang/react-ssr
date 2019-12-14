import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import Index from './container/Index';
import About from './container/About';

export default <div>
    <Route path="/" exact component={Index}></Route>
    <Route path="/about" exact component={About}></Route>
</div>

// function App(props) {
//     const [count, setCount] = useState(1);
//     return <div>
//         <h1>Hello {props.title} ! {count}</h1>
//         <button onClick={() => setCount(count + 1)}>累加</button>
//     </div>
// }

// export default <App title='开课吧'></App>;