import React from 'react';
import ReactDOM from 'react-dom';
import ExpensifyApp from '../containers/ExpensifyApp';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({adapter: new Adapter()});

describe('Rendering ExpensifyApp', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ExpensifyApp/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});





















