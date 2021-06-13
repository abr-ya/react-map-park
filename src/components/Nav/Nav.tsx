import React from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.scss';

interface INav {
  title: string;
  links: ILink[]
}

interface ILink {
  link: string;
  name: string;
  exact: boolean;
}

const Nav = ({title, links}: INav) => {
  let htmlLinks: any[] = [];
  if (Array.isArray(links) && links.length) {
    htmlLinks = links.map((item) => (
      <li className="nav-item" key={item.link}>
        <NavLink exact={item.exact} to={item.link} className="nav-link">{item.name}</NavLink>
      </li>
		));
  }

  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
      <div className="navbar-brand">{title}</div>
      <ul className="navbar-nav">{htmlLinks}</ul>
    </nav>
  );
}

export default Nav;
