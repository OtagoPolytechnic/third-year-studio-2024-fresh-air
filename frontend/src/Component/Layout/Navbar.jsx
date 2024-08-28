import { NavLink } from "react-router-dom";
import { routes } from "../../router/routeList";
import logo from '../../Imgs/logo-black.png'

const NavBar = () => {
  return (
    <>
<nav class="bg-gray-200 shadow-md shadow-gray-400 px-8 py-2 md:px-auto mb-2">
	<div class="md:h-16 h-28 md:px-4 flex items-center justify-center sm:justify-between flex-wrap md:flex-nowrap">
		<div class="text-indigo-500">
      <img src={logo} class={'h-16'}/>
		</div>
		<div class="text-gray-500 md:w-auto flex items-center">
			<ul class="flex font-semibold justify-between">
      {routes.map((route, index) => (
            <li key={index} className="px-2 lg:pb-1 hover:text-indigo-600">
              <NavLink to={route.path}>{route.label}</NavLink>
            </li>
          ))}
			</ul>
      <div className={'ml-4'}>
			<button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
        Login
         </button>
		</div>
    </div>
	</div>
</nav>
    </>
  );
};
export default NavBar;
