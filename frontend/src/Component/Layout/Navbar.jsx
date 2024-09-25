import { NavLink } from 'react-router-dom';
import { routes } from '../../router/routeList';
import logo from '../../Imgs/logo-black.png';
import { filterRouter } from '../../utils/router/filterRouter';
import { useUserAuth } from '../../Context/FirestoreAuthContext';

const NavBar = () => {
  const { user } = useUserAuth();
  const filteredRoutes = filterRouter(routes, user);

  return (
    <nav
      className="bg-gray-200 shadow-md shadow-gray-300 px-8 py-2 md:px-0 mb-2"
      aria-label="Main Navigation"
    >
      <header className="flex items-center justify-evenly sm:justify-between flex-wrap md:flex-nowrap h-28 md:h-16 md:px-4">
        <NavLink to={'/'} aria-label="Home">
          <img src={logo} alt="Company Logo" className="h-16" />
        </NavLink>
        <ul className="flex font-semibold" role="menu" aria-label="Primary Navigation">
          {filteredRoutes.map((route, index) => (
            <li key={index} className="px-2 lg:pb-1 hover:text-black" role="none">
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  isActive ? 'text-black' : 'text-gray-500'
                }
                role="menuitem"
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                {route.label}
              </NavLink>
            </li>
          ))}
          
        </ul>
      </header>
    </nav>
  );
};

export default NavBar;
