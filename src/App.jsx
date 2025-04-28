import React from 'react';
import Navbar from './components/Navbar';
import DoctorDirectory from './components/DoctorDirectory';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <DoctorDirectory />
    </div>
  );
};

export default App;
