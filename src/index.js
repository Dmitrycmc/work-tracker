import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/app/app';
import * as serviceWorker from './serviceWorker';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';

library.add(faPlay, faPause, faStop);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
