import Header from "./components/Header";
import Footer from "./components/Footer";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="app-container">
        <div className="card">
          <h2 className="title">Schedule an Appointment</h2>
          <AppointmentForm />
          <AppointmentList />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;