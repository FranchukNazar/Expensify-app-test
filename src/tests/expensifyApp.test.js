import React from 'react';
import ReactDOM from 'react-dom';
import ExpensifyApp from '../containers/ExpensifyApp';


describe('Rendering ExpensifyApp', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ExpensifyApp/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});





















