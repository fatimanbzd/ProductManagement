import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../redux/actions'; // Create this file in the next step

const Counter = ({ count, increment, decrement }) => (
    <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
    </div>
);

const mapStateToProps = (state) => ({
    count: state.counter,
});

export default connect(mapStateToProps, { increment, decrement })(Counter);