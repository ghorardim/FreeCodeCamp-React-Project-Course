import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
const Nav = () => {
  const location = useLocation();
  useEffect(() => {
    const allNavItems = document.querySelectorAll('.navbarClass');
    for (const navItem of allNavItems) {
      navItem.classList.remove('navbarSelected');
      if (
        navItem.firstChild.firstChild.data === 'Home' &&
        location.pathname === '/'
      ) {
        navItem.classList.add('navbarSelected');
      } else if (
        '/' + navItem.firstChild.firstChild.data ===
        location.pathname
      ) {
        navItem.classList.add('navbarSelected');
      }
    }
  });
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item navbarClass">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item navbarClass">
          <Link className="nav-link" to="/Teams">
            Teams
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;