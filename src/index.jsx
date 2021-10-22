import React from 'react';
import ReactDOM from 'react-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import * as serviceWorker from './serviceWorker';
import './languages';
import App from './App';
import './index.css';
import './override.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-dropdown-tree-select/dist/styles.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
