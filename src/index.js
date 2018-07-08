import React from 'react';
import ReactDOM from 'react-dom';
import ExpensifyApp from './containers/ExpensifyApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<ExpensifyApp />, document.getElementById('root'));
registerServiceWorker();
