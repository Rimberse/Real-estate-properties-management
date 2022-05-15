import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Property from './components/Property';
import NewProperty from './components/NewProperty';
import propertyService from './services/properties';
import PageButton from "./components/PageButton";

const App = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(Number(1));
  const lastPage = useRef(0);     // used to persist last page number for total number of properties between renders

  // Runs once (upon first loading of webpage). Sets total number of real estate properties
  // Used to get the rightmost value for pagination
  useEffect(() => {
    propertyService
      .getCount()
      .then(nbProperties => lastPage.current = Math.ceil(nbProperties.count / 10));
  }, []);

  // Runs when the component is initally rendered,
  // and also anytime when the next or prev page is loaded (dependant on page value)
  useEffect(() => {
    propertyService
      .getAll(page)
      .then(initialProperties => {
        setProperties(initialProperties.data);
        setPage(Number(initialProperties.meta.page));
      })
  }, [page]);

  const loadPrevPage = () => {
    if (page <= 1)
      return;
    
    setPage(page - 1);
  }

  const loadNextPage = () => {
    if (page >= lastPage.current)
      return;

    setPage(page + 1);
  };

  return (
    <div className="App">
      <h1>Real estate agency</h1>
      {<NewProperty />}
      <ul>
        {properties.map(property => <Property key={property.id} property={property} />)}
      </ul>
      <div id="pagination-bar">
        {/* Conditional rendering, if it's the first page, the previous button (0) won't be rendered */}
        {page > 1 && <PageButton page = {page - 1} loadPage = {() => loadPrevPage()} />}
        {<PageButton page = {page} active = {true} />}
        {(page + 1) < lastPage.current && <PageButton page = {page + 1} loadPage = {() => loadNextPage()} />}
        {(lastPage.current > 2 && (page + 1) < lastPage.current) && <PageButton page = {'...'} />}
        {(lastPage.current > 2 && page < lastPage.current) && <PageButton page = {lastPage.current} loadPage = {() => setPage(lastPage.current)} />}
      </div>
    </div>
  );
}

export default App;
