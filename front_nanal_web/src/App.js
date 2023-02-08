import './App.css';
import React from 'react';
import Nav from './main/Nav';
import AppMain from './main/AppMain.js';

function App() {
  return (
    <div className='App justify-center'>
      <Nav />
      <hr className='mb-3 border-slate-500/75' />
      <AppMain />
    </div>
  );
}

export default App;
