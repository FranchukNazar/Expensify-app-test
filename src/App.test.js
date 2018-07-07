import React from 'react';
import ReactDOM from 'react-dom';
import ExpensifyApp from './Components/ExpensifyApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExpensifyApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
