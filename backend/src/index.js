// Using dependencies
const express = require('express');
const cors = require('cors');           // used to communicate with a backend from another URL
const app = express();
app.use(express.json());
app.use(cors());

// Logging requests 
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:', request.path);
    console.log('Body:', request.body);
    console.log('-------');
    next();
};

app.use(requestLogger);

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

app.get('/api/properties', (request, response) => {
    response.json(realProperties);
});

// sends a json response if no associate route is found e.g: (/something/somewhere)
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

