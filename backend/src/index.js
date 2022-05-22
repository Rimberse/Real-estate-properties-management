// Using dependencies
const express = require('express');
const cors = require('cors');           // used to communicate with a backend from another URL
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require('dotenv').config({ path: "../.env" });
const properties = require('./services/properties');

// Logging requests 
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:', request.path);
    console.log('Body:', request.body);
    console.log('---------------------');
    next();
};

app.use(requestLogger);

app.use((error, request, response, next) => {
    const statusCode = error.statusCode || 500;
    console.error(error.message, error.stack);
    response.status(statusCode).json({ message: error.message });
    return;
});

const realProperties = [
    {
        id: 1,
        address: '123 rue de Machin, Villejuif',
        owner: 'Jessy VY',
        type: 'Maison',
        bedrooms: 5,
        surface: '110 m2',
        state: 'neuf',
        price: 399000,
        availabilityDate: new Date('07/15/2022').toDateString(),
        city: 'Villejuif',
        parkingLots: 2
    },
    {
        id: 2,
        address: '457 boulevard de Bidul, Paris 75016',
        owner: 'Meryem KOSE',
        type: 'Appartement',
        bedrooms: 3,
        surface: '80 m2',
        state: 'neuf',
        price: 599000,
        availabilityDate: new Date('09/22/2022').toDateString(),
        city: 'Paris 16eme',
        parkingLots: 1
    },
    {
        id: 3,
        address: '987 avenue de tristesse, Rouen',
        owner: 'Ratiba KADI',
        type: 'Maison',
        bedrooms: 8,
        surface: '180 m2',
        state: 'Bon etat',
        price: 250000,
        availabilityDate: new Date().toDateString(),
        city: 'Rouen',
        parkingLots: 2
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Real estate agency</h1>');
});

// GET total number of properties in db. Used to calculate number of pages
app.get('/api/properties/total', async (request, response, next) => {
    try {
        response.json(await properties.getAll());
    } catch (error) {
        console.log(`Error while getting total number of properties `, error.message);
        next(error);
    }
});

// GET real estate properties. Used to get the list of all properties
app.get('/api/properties', async (request, response, next) => {
    // response.json(realProperties);
    try {
        response.json(await properties.getMultiple(request.query.page));
    } catch (error) {
        console.error(`Error while getting properties `, error.message);
        next(error);
    }
});

// POST real estate property. Used to add new property to db
app.post('/api/properties', async (request, response, next) => {
    try {
        response.json(await properties.create(request.body));
    } catch (error) {
        console.error(`Error while creating property`, error.message);
        next(error);
    }
});

// PUT real estate property. Used to update informations of existing property in db
app.put('/api/properties/:id', async (request, response, next) => {
    try {
        response.json(await properties.update(request.params.id, request.body));
    } catch (error) {
        console.error(`Error while updating property`, error.message);
        next(error);
    }
});

// DELETE real estate property. Used to remove an existing property from the list (front) and from the db
app.delete('/api/properties/:id', async (request, response, next) => {
    try {
        response.json(await properties.remove(request.params.id));
    } catch (error) {
        console.error(`Error while deleting property`, error.message);
        next(error);
    }
});

// sends a json response if no associate route is found e.g: (/something/somewhere)
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
