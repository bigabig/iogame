import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from "./Navbar";
import Edit from './record/edit';
import RecordList from './record/recordlist';
import Create from "./record/create";

import "bootstrap/dist/css/bootstrap.css"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/" component={RecordList} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/create" component={Create} />
    </div>
  );
}

export default App;
