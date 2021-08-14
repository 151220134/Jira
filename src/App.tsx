import React from 'react';
import { useAuth } from 'screens/Context/AuthContext';
import { UnauthenticatedApp } from 'screens/UnauthenticatedApp';
import { AuthenticatedApp } from 'screens/AuthenticatedApp';
// import logo from './logo.svg';
import './App.css';

function App() {
  const {user} = useAuth();
  return (
    <div className="App">
      {user?<AuthenticatedApp/>:<UnauthenticatedApp/>}
    </div>
  );
}

export default App;
