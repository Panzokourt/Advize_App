import React from "react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Clients", link: "/clients" },
    { name: "Services", link: "/services" },
    { name: "Tasks", link: "/tasks" },
  ];

  return (
    <aside className="w-64 bg-purple-800 text-white flex flex-col">
      <div className="flex items-center justify-center h-16 font-bold border-b border-purple-700">
        AdvizeApp
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                className="block p-3 rounded hover:bg-purple-700 text-sm font-medium"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
