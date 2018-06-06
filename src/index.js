import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';





ReactDOM.render(
  (<div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <App />
  </div>),

document.getElementById('root'));
registerServiceWorker();
