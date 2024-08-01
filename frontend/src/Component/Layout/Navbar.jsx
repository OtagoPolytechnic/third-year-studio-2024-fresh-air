import { NavLink } from "react-router-dom";
import { routes } from "../../router/routeList";
import logo from "../../Imgs/logo.png";

const NavBar = () => {
  return (
    <>
      <nav className="h-16 w-screen bg-blue-500 fixed z-10 text-white flex">
        <img class="ml-2 mt-2 object-center h-12" src={logo} alt="Logo"></img>
        <ul className="ml-2 flex items-center">
          {routes.map((route, index) => (
            <li key={index} className="px-2 lg:pb-1 font-bold hover:underline">
              <NavLink to={route.path}>{route.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
export default NavBar;
