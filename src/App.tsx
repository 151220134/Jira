import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { ProjectListScreen } from 'screens/ProjectList';
import { LoginScreen } from 'screens/Login';

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen/> */}
      <LoginScreen/>
    </div>
  );
}

export default App;
