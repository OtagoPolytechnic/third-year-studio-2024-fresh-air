import { NavLink } from "react-router-dom";
import { routes } from "../../router/routeList";
import logo from "../../Imgs/logo.png";

const NavBar = () => {
  return (
    <>
      <nav className="h-16 w-screen bg-blue-500 fixed z-10 text-white flex text-center ">
        <img src={logo} alt="Logo"></img>
        <ul className="flex">
          {routes.map((route, index) => (
            <li key={index} className="px-4 lg:pb-4 font-bold hover:underline">
              <NavLink to={route.path}>{route.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
export default NavBar;
