import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarApp } from './CalendarApp';
import './index.scss';

console.log(process.env);

ReactDOM.render(<CalendarApp />, document.getElementById('root'));
