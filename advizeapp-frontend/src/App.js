import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <MainContent />
      <RightPanel />
    </div>
  );
}

export default App;
