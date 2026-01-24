import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppointmentForm from './components/AppointmentForm';
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <AppointmentForm />
            </main>
            <Footer />
        </div>
    );
}

export default App;
