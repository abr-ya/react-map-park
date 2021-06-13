import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Map from './map/map';
import About from './pages/About';
import Contact from './pages/Contact';

export interface ILink {
  link: string;
  name: string;
  exact: boolean;
}

const App = () => {
  const links: ILink[] = [
    { link: '/', name: 'Карта', exact: true },
    { link: '/about', name: 'О приложении', exact: true },
    { link: '/contact', name: 'Контакты', exact: true },
  ];

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="col-12">
          <Nav title="React, TS, Openlayers, Bootstrap..." links={links} />
        </div>
      </div>
      <Switch>
        <Route path="/" component={Map} exact />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
