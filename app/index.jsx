import React from 'react';
import ReactDOM from 'react-dom';
import IndexComponent from './components/index.component';
import promise from 'es6-promise';
import './less/app.less';

//promise polyfill
promise.polyfill();

ReactDOM.render(<IndexComponent />, document.getElementById('app'));