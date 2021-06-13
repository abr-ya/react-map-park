import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Map from './map/map';
import About from './pages/About';
import Main from './pages/Main';

export interface ILink {
  link: string;
  name: string;
  exact: boolean;
}

const App = () => {
  const links: ILink[] = [
    { link: '/', name: 'Главная', exact: true },
    { link: '/map', name: 'Карта', exact: true },
    { link: '/about', name: 'О приложении', exact: true },
  ];

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="col-12">
          <Nav title="React, TS, Openlayers, Bootstrap..." links={links} />
        </div>
      </div>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/map" component={Map} />
        <Route path="/about" component={About} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
