import React from 'react';
import './App.css';
import { BrowserRouter ,Switch, Route } from 'react-router-dom';
import Home from './containers/Home/Home';
import Chat from './containers/Chat/Chat';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/chat/:id/:exists?" exact component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
