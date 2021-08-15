import React from 'react';
import { useAuth } from 'context/AuthContext';
import { UnauthenticatedApp } from 'UnauthenticatedApp';
import { AuthenticatedApp } from 'AuthenticatedApp';
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
