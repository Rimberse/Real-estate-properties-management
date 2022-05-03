import React from 'react';

const Property = ({property}) => {
    return (
        <li className="property">
          <b>Adresse :</b> {property.address}
          <br></br>
          <b>Propriétaire :</b> {property.owner}
          <br></br>
          <b>Type:</b> {property.type}
          <br></br>
          <b>Nombre de pièces :</b> {property.bedrooms}
          <br></br>
          <b>Superficie habitable :</b> {property.surface}
          <br></br>
          <b>Etat d’habitation :</b> {property.state}
          <br></br>
          <b>Prix de mise en vente :</b> {property.price}
          <br></br>
          <b>Date de disponibilité :</b> {property.availabilityDate}
          <br></br>
          <b>Ville :</b> {property.city}
          <br></br>
          <b>Nombre de garages :</b> {property.parkingLots}
        </li>
    );
};

export default Property;