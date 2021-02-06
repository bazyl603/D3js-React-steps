import React, { Suspense, lazy} from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import "./App.css";
const Render = lazy(() => import('./components/Render'));
const Month = lazy(() => import('./components/Month'));

function App() {

  return (
      <Router basename="/">
        <div className="App">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>            
              <Route path="/" exact component={Render} />
              <Route path="/:month" component={Month} />
              <Route exact render={() => <h1>404</h1>} />
            </Switch>  
          </Suspense>      
        </div>
      </Router>   
  );
}

export default App;
