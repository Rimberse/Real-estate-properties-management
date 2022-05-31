const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const getMultiple = async (page = 1) => {
    const offset = helper.getOffset(page, config.listPerPage);
    
    const rows = await db.query(
        `SELECT id, prix_reel, commission, property_id, client_id FROM Achats LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

const create = async transaction => {
    const result = await db.query(
        `INSERT INTO Achats (prix_reel, property_id, client_id, commission) VALUES('${transaction.prix}', '${transaction.propertyId}', '${transaction.clientId}', '${transaction.commission}');`
    );

    if (result.affectedRows) {
        message = 'Transaction has been made successfully!';
    }

    return { message };
}

module.exports = {
    getMultiple,
    create
}