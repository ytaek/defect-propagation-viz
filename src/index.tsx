import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import '@material/react-material-icon/index.scss';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"/>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();