const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const getMultiple = async (page = 1) => {
    const offset = helper.getOffset(page, config.listPerPage);
    // returns listPerPage number of records after the offset. For example : LIMIT 5, 10 will return records from 6 to 15
    const rows = await db.query(
        `SELECT id, adresse, proprietaire, type, nbPieces, superficie, etat, prix, date, ville, nbGarages, image 
        FROM properties LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

const getAll = async () => {
    const rows = await db.query(
        `SELECT COUNT(*) AS count FROM properties`
    );

    return rows[0];
}

module.exports = {
    getMultiple,
    getAll
}