import React from 'react';

const Property = ({ property }) => {
  // Formats price to the given currency and region. Used to nicely format price of real estates
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  });

  return (
    <li className="property">
      <img src={property.image} alt="Property"></img>
      <br></br>
      <div className="property-info">
        <div className="item">
          <i className="fa-solid fa-location-dot"></i><span>{property.adresse}</span>
          <i className="fa-solid fa-city"></i><span>{property.ville}</span>
        </div>
        <div className="item">
          <span><i className={'fa-solid ' + (property.type === 'Maison' ? 'fa-house' : 'fa-building')}></i>{property.type}</span>
          <span><i className="fa-solid fa-square-full"></i>{property.superficie}</span>
        </div>
        <div className="item">
          <span><i className="fa-solid fa-bed"></i>{property.nbPieces}</span>
          <span><i className="fa-solid fa-warehouse"></i>{property.nbGarages}</span>
        </div>
        <div className="item">
          <span><i className="fa-solid fa-calendar-days"></i>{property.date.substring(0, property.date.indexOf('T'))}</span>
          <span><i className="fa-solid fa-clock"></i>{property.date.substring(property.date.indexOf('T') + 1, property.date.indexOf('.'))}</span>
        </div>
        <div className="item">
          <span><i className="fa-solid fa-dollar-sign"></i>{formatter.format(property.prix)}</span>
          <button className="property-more-btn">Voir</button>
        </div>
        <div className="item">
          <span><i className="fa-solid fa-user"></i>{property.proprietaire}</span>
          <span><i className="fa-solid fa-circle-check"></i>{property.etat}</span>
        </div>
      </div>
    </li>
  );
};

export default Property;