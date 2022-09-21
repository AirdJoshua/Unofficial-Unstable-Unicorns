import React from 'react';

import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import Loading from './Screens/Loading';

ReactDOM.render(

    <Router>

       <Switch>

		      <Route exact path="/" component={App}/>

				<Route exact path="/load" component={Loading}/>

	    </Switch>

    </Router>,

    document.getElementById('root')

);