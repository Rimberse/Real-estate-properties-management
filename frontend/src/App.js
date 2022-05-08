import React, { useState, useEffect } from 'react';
import './App.css';
import Property from './components/Property';
import propertyService from './services/properties';

const App = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    propertyService
      .getAll()
      .then(initialProperties => {
        setProperties(initialProperties.data);
        setPage(initialProperties.meta.page);
      })
  }, []);
  
  return (
    <div className="App">
      <h1>Real estate agency</h1>

      <ul>
        {properties.map(property => <Property key={property.id} property={ property } />)}
      </ul>
    </div>
  );
}

export default App;
