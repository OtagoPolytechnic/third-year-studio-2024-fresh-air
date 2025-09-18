import { NavLink } from 'react-router-dom';
import { routes } from '../../router/routeList';
import logo from '../../Imgs/logo-black.png';
import { filterRouter } from '../../utils/router/filterRouter';
import { useUserAuth } from '../../Context/FirestoreAuthContext';
import { useState } from 'react';
import { routerLabels } from "../../utils/router/routerLabels";
import { useGetBlockList } from '../../Hooks/Blocks/useGetBlockList';


const NavBar = () => {
  const { user } = useUserAuth();
  const filteredRoutes = filterRouter(routes, user);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showBlocksDropdown, setShowBlocksDropdown] = useState(false);

  // Admin dropdown items with updated paths
  const adminDropdownRoutes = [
    { label: routerLabels.devices, path: '/admin/devices' },
    { label: routerLabels.blocks, path: '/admin/blocks' },
    { label: routerLabels.users, path: '/admin/users' },
  ];

  const apiKey = import.meta.env.VITE_BACKEND_API_KEY;
const { blocks } = useGetBlockList(`${apiKey}/api/v1/blocks`);

  return (
    <nav
      className="px-8 py-4 md:px-2 mb-2"
      aria-label="Main Navigation"
    >
<header className="flex items-center justify-between flex-wrap md:flex-nowrap h-28 md:h-16 md:px-4">
{/* Left side: Logo + Locations dropdown */}
  <div className="flex items-center space-x-6">
    <NavLink to="/" aria-label="Home">
      <img src={logo} alt="Company Logo" className="h-16" />
    </NavLink>
{/* Locations dropdown */}
<div className="relative">
  <button
    className="font-semibold text-gray-500 hover:text-black"
    onClick={() => setShowBlocksDropdown((prev) => !prev)}
  >
    Locations ▾
  </button>

  {showBlocksDropdown && Array.isArray(blocks) && (
    <ul className="absolute left-0 mt-2 bg-white shadow-md rounded-md z-10 w-48">
      {blocks.map((block, index) => (
        <li key={index} className="hover:bg-gray-100">
          <NavLink
            to={`/${block.blockName}`}
            className={({ isActive }) =>
              isActive
                ? "text-black block px-4 py-2"
                : "text-gray-500 block px-4 py-2"
            }
            onClick={() => setShowBlocksDropdown(false)} // close after navigation
          >
            {block.blockName}
          </NavLink>
        </li>
      ))}
    </ul>
  )}
</div>

</div>

  {/* Right side: Primary navigation */}
  <ul className="flex font-semibold space-x-2" role="menu" aria-label="Primary Navigation">
    {filteredRoutes.map((route, index) => (
      <li
        key={index}
        className="relative px-2 lg:pb-1 hover:text-black"
        onMouseEnter={() => setShowAdminDropdown(route.label === routerLabels.admin)}
        onMouseLeave={() => setShowAdminDropdown(false)}
        role="none"
      >
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
        {route.label === routerLabels.admin && showAdminDropdown && (
          <ul className="absolute bg-white shadow-md mt-1 z-10">
            {adminDropdownRoutes.map((adminRoute, adminIndex) => (
              <li key={adminIndex} className="hover:bg-gray-100">
                <NavLink
                  to={adminRoute.path}
                  className={({ isActive }) =>
                    isActive ? 'text-black block px-4 py-2' : 'text-gray-500 block px-4 py-2'
                  }
                >
                  {adminRoute.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
</header>

    </nav>
  );
};

export default NavBar;