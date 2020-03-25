import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import FirebaseProvider from './utils/firebase'

ReactDOM.render(
  <BrowserRouter>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
