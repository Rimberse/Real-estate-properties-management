import React, { useState, useEffect, useRef } from 'react';
import houseTourService from '../services/houseTours';
import PageButton from "./PageButton";
import Property from './Property';

function HouseTours() {
  const [houseTours, setHouseTours] = useState([]);
  const [page, setPage] = useState(Number(1));
  const [properties, setProperties] = useState([]);
  const lastPage = useRef(0);
  
  useEffect(() => {
      houseTourService
        .getAll(page)
          .then(houseTours => {
            setHouseTours(houseTours.data);
            setPage(Number(houseTours.meta.page));
            console.log(houseTours.data);
            console.log(houseTours.meta.page);

            // Destructure reponse object's array of house tours to retrieve only subset of object properties, related to properties
            const arr = houseTours.data.map(houseTour => {
              const property = (({ adresse, proprietaire, type, nbPieces, superficie, etat, prix, ville, nbGarages, image, taux }) => 
              ({ adresse, proprietaire, type, nbPieces, superficie, etat, prix, ville, nbGarages, image, taux }))(houseTour);
              property.date = houseTour.date_disponibilite;
              return property;
            });
            console.log(arr);
          });
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
    <div className="house-tours">
      <div className="house-tours-card">
        <div>
            
        </div>
      </div>
      <div id="pagination-bar">
        {page > 1 && <PageButton page={page - 1} loadPage={() => loadPrevPage()} />}
        {<PageButton page={page} active={true} />}
        {(page + 1) < lastPage.current && <PageButton page={page + 1} loadPage={() => loadNextPage()} />}
      </div>
    </div>
  )
}

export default HouseTours;