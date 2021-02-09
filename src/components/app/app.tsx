import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../header/header';
import StatsPage from '../pages/stats-page/stats-page';
import TodoPage from '../pages/todo-pages/todo-page';

import './app.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route path="/" exact component={TodoPage} />
          <Route path="/stats" exact component={StatsPage} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
