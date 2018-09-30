import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faEdit, faTimes, faTrash);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
