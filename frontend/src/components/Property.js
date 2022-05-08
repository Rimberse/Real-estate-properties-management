import React from 'react';

const Property = ({ property }) => {
    return (
        <li className="property">
          <img src={property.image} alt="Property"></img>
          <br></br>
          <b>Adresse :</b> {property.adresse}
          <br></br>
          <b>Propriétaire :</b> {property.proprietaire}
          <br></br>
          <b>Type:</b> {property.type}
          <br></br>
          <b>Nombre de pièces :</b> {property.nbPieces}
          <br></br>
          <b>Superficie habitable :</b> {property.superficie}
          <br></br>
          <b>Etat d’habitation :</b> {property.etat}
          <br></br>
          <b>Prix de mise en vente :</b> {property.prix}
          <br></br>
          <b>Date de disponibilité :</b> {property.date}
          <br></br>
          <b>Ville :</b> {property.ville}
          <br></br>
          <b>Nombre de garages :</b> {property.nbGarages}
        </li>
    );
};

export default Property;