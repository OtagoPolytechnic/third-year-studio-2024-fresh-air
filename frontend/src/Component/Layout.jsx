import React from 'react';

const Layout = ({ navbar, body }) => {
  return (
    <div className="font-sans antialiased text-gray-900">
      <nav className="bg-blue-500 text-white w-full p-4 flex items-center fixed top-0 
                      md:w-auto md:h-full md:fixed md:left-0 md:flex-col">
        <div className="container mx-auto md:flex md:flex-col">
          {navbar}
        </div>
      </nav>
      <main className="mt-20 p-4 md:ml-40">
        <div className="container mx-auto">
          {body}
        </div>
      </main>
    </div>
  );
};

export default Layout;