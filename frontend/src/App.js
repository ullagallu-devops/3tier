import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <EntryForm />
        <EntryList />
      </div>
      <Footer />
    </div>
  );
}

export default App;
