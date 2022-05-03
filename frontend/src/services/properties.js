import axios from 'axios';
const baseUrl = 'http://localhost:5000/api/properties';

const getAll = () => {
    const request = axios.get(baseUrl);

    const nonExisting = {
        id: 0,
        address: 'This property is not saved to the database',
        owner: 'Person',
        type: 'Appartement',
        bedrooms: 1,
        surface: '1 m2',
        state: 'neuf',
        price: 0,
        availabilityDate: new Date().toDateString(),
        city: 'Unkown',
        parkingLots: 0
    }

    return request.then(response => response.data.concat(nonExisting));
};

const noteServce = { getAll };

export default noteServce;