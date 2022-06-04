import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import LoginUser from "./components/LoginUser";
import LoginAdmin from "./components/LoginAdmin";
import ForgotPassword from "./components/ForgotPassword";
import Properties from "./components/Properties";
import HouseTours from "./components/HouseTours";
import Transactions from './components/Transactions';

const App = () => {
  const [user, setUser] = useState('Guest');    // Used to grand the admin right to perform CUD operations
  const [clientID, setClientID] = useState(0);  // Used to get clientID from DB, which is used later on when client books a property

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginUser" element={<LoginUser setRole={setUser} setID={setClientID} />} />
        <Route path="/LoginAdmin" element={<LoginAdmin setRole={setUser} />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />

        <Route path="/Properties" element={<Properties role={user} id={clientID} />} />
        <Route path="/HouseTours" element={<HouseTours role={user} />} />
        <Route path="/Transactions" element={<Transactions role={user} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
