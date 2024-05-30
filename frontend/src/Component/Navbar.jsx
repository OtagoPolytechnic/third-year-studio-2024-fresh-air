import React from 'react';

const Navbar = ({ navbar, body }) => {
  return (
    <div id="root" className="md:mx-6 flex flex-col">
      <nav
        className="bg-blue-500 text-white p-4 flex items-center fixed top-0 
                md:h-full md:max-w-[200px] w-screen md:fixed md:left-0 md:flex-col z-10 sm:z-10"
      >
        <div className="container mx-auto md:flex md:flex-col">{navbar}</div>
      </nav>
      <main className="mt-20 p-4 md:ml-40 flex-1 overflow-y-auto">
        <div className="container mx-auto">{body}</div>
      </main>
    </div>
  );
};

export default Navbar;
