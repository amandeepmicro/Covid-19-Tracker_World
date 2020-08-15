import React from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import News from './components/News/News';
import Precautions from './components/Precautions/Precautions';
import Contact from './components/Contact/Contact';

function App(){
  return(  
      <BrowserRouter>
       <div>
       <Navbar/>
        <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route exact path="/news" component={News} />
        <Route exact path="/precautions" component={Precautions} />
        <Route exact path="/usefulLinks" component={Contact} />
      </Switch>
      </div>
      </BrowserRouter>
  )
  
}
export default App;
