import React from 'react';
import './App.css';
import LoginForm from './LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Login Form</h1>
      </header>
      <main>
        <LoginForm />
      </main>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
