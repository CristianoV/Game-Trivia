import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
