import React from 'react';
import './App.css'
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import About from './components/About'
import Donate from './components/Donate';
import Contact from './components/Contact';
function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <MainPage />
      </main>
      <div id='about'>
        < About />
      </div>
      <div id='donate'>
      <Donate/>
      </div>
      <div id='contact'>
      <Contact />
      </div>
      <footer>
        <h4>Made by Pooja as a project of Integrating razorpay with mern backend</h4>
      </footer>
    </div>
  );
}

export default App;
