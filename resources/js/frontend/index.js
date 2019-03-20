import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import Amplify from 'aws-amplify'
import awsmobile from '../../../awsmobilejs/#current-backend-info/aws-exports';

Amplify.configure(awsmobile)
ReactDOM.render(
    <App/>, document.getElementById('root'));
registerServiceWorker();
