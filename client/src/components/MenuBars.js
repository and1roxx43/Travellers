import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  // dynamically set the 'active' link by looking at the current URL
  const pathName = window.location.pathname;
  const path = pathName === '/' ? 'home' : pathName.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary floated="right" size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item style={{color: "white"}} name="logout" onClick={logout} as={Link} to="/" />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary floated="right"  size="massive" color="teal">
      <Menu.Item style={{color: "white", fontSize: "1.5rem"}} name="home" active={activeItem === 'home'} onClick={handleItemClick} as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item style={{color: "white", fontSize: "1.5rem"}} name="login" active={activeItem === 'login'} onClick={handleItemClick} as={Link} to="/login" />
        <Menu.Item
          style={{color: "white", fontSize: "1.5rem"}}  
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
