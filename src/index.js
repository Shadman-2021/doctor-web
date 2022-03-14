import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/login';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from 'react-router-dom';


const routing = (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/doctors" component={App} />
        </div>
    </BrowserRouter> 
     

)

ReactDOM.render(routing,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
