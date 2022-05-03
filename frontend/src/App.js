import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Property from './components/Property';
import propertyService from './services/properties';

const App = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    propertyService
      .getAll()
      .then(initialProperties => {
        setProperties(initialProperties);
      })
  }, []);
  
  return (
    <div className="App">
      <h1>Real estate agency</h1>

      <ul>
        {properties.map(property => <Property key={property.id} property={property} />)}
      </ul>
    </div>
  );
}

export default App;
