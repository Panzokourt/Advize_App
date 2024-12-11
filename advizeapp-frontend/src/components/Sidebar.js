// Sidebar Component
function Sidebar() {
  return (
    <div className="w-1/5 h-screen bg-gray-100 border-r border-gray-300 p-4">
      <h2 className="text-xl font-bold mb-6">AdvizeApp</h2>
      <nav>
        <ul className="space-y-4">
          <li className="hover:text-purple-600"><a href="#">Dashboard</a></li>
          <li className="hover:text-purple-600"><a href="#">Messages</a></li>
          <li className="hover:text-purple-600"><a href="#">Projects</a></li>
          <li className="hover:text-purple-600"><a href="#">Teams</a></li>
          <li className="hover:text-purple-600"><a href="#">Settings</a></li>
        </ul>
      </nav>
    </div>
  );
}