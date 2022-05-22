import React, { useState } from 'react';
import propertyService from '../services/properties';
import NewProperty from './NewProperty';

const Property = ({ property, user }) => {
  const [edit, setEdit] = useState(false);
  const [propertyId, setPropertyId] = useState(property.id);

  // Formats price to the given currency and region. Used to nicely format price of real estates
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  });

  const editHandler = () => {
    setPropertyId(property.id);
    setEdit(!edit);
  }

  return (
    <li>
      <div className="property-card">
        <div className="property">
          <img src={property.image} alt="Property"></img>
          <br></br>
          <div className="property-info">
            <div className="item">
              <div><span className="icon"><i className="fa-solid fa-location-dot"></i></span><span className="icon-text">{property.adresse}</span></div>
              <div><span className="icon"><i className={'fa-solid ' + (property.type === 'Maison' ? 'fa-house' : 'fa-building')}></i></span><span className="icon-text">{property.type}</span></div>
              <div><span className="icon"><i className="fa-solid fa-bed"></i></span><span className="icon-text">{property.nbPieces} pièces</span></div>
              <div><span className="icon"><i className="fa-solid fa-calendar-days"></i></span><span className="icon-text">{property.date.substring(0, property.date.indexOf('T'))}</span></div>
              <div><span className="icon"><i className="fa-solid fa-dollar-sign"></i></span><span className="icon-text">{formatter.format(property.prix)}</span></div>
              <div><span className="icon"><i className="fa-solid fa-user"></i></span><span className="icon-text">{property.proprietaire}</span></div>
            </div>
            <div className="item">
              <div><span className="icon"><i className="fa-solid fa-city"></i></span><span className="icon-text">{property.ville}</span></div>
              <div><span className="icon"><i className="fa-solid fa-square-full"></i></span><span className="icon-text">{property.superficie}</span></div>
              <div><span className="icon"><i className="fa-solid fa-warehouse"></i></span><span className="icon-text">{property.nbGarages} garages</span></div>
              <div><span className="icon"><i className="fa-solid fa-clock"></i></span><span className="icon-text">{property.date.substring(property.date.indexOf('T') + 1, property.date.indexOf('.'))}</span></div>
              <button className="property-more-btn">
                <span className="circle" aria-hidden="true">
                  <span className="icon plus"></span>
                </span>
                <span className="button-text">En savoir</span>
              </button>
              <div><span className="icon"><i className="fa-solid fa-circle-check"></i></span><span className="icon-text">{property.etat}</span></div>
            </div>
          </div>
        </div>
        {user === 'Admin' && <div>
          <button className="property-edit-btn" onClick={editHandler}><span className="icon edit"><i className="fa-solid fa-pen"></i></span><span className="icon-text">Modifier</span></button>
          <button className="property-delete-btn"><span className="icon delete"><i className="fa-solid fa-trash"></i></span><span className="icon-text">Supprimer</span></button>
        </div>}
      </div>
      {edit && <NewProperty user = {'Edit'} id = {propertyId} />}
    </li>
  );
};

export default Property;