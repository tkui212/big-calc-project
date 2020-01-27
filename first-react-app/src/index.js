import React from 'react';
import ReactDOM from 'react-dom';
import Home_page from './home_page/home_page.js';
import Phy_page from './phy/Phy_page.js';
import * as serviceWorker from './serviceWorker';
// ReactDOM.render(<Home_page />, document.getElementById('root'));
ReactDOM.render(<Phy_page />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
