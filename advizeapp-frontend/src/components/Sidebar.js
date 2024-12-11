import React from "react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: "🏠", link: "/dashboard" },
    { name: "Clients", icon: "👥", link: "/clients" },
    { name: "Services", icon: "📦", link: "/services" },
    { name: "Tasks", icon: "📝", link: "/tasks" },
  ];

  return (
    <aside className="w-64 bg-purple-700 text-white flex flex-col pt-20 fixed h-full">
      <nav className="flex-1 px-4">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                className="flex items-center space-x-3 hover:bg-purple-800 p-3 rounded text-sm"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
