import { NavLink } from "react-router-dom";
import { routes } from "../../router/routeList";
import logo from '../../Imgs/logo-black.png'

const NavBar = () => {
  return (
    <>
<nav class="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
	<div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
		<div class="text-indigo-500 md:order-1">
      <img src={logo} class={'h-16 w-fit'}/>
		</div>
		<div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
			<ul class="flex font-semibold justify-between">
      {routes.map((route, index) => (
            <li key={index} className="px-2 lg:pb-1 font-bold hover:text-indigo-500">
              <NavLink to={route.path}>{route.label}</NavLink>
            </li>
          ))}
			</ul>
		</div>
		<div class="order-2 md:order-3">
			<button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
        Login
         </button>
		</div>
	</div>
</nav>
    </>
  );
};
export default NavBar;
