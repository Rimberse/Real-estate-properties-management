import axios from 'axios';
const baseUrl = 'http://localhost:5000/api/properties';

const getAll = page => {
    const queryString = `?page=${page}`;
    const request = axios.get(baseUrl + queryString);

    return request.then(response => response.data);
};

const getCount = () => {
    const request = axios.get(baseUrl + '/total');
    return request.then(response => response.data);
}

const addProperty = payload => {
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }      

    const request = axios.post(baseUrl, payload, config);

    return request.then(response => response);
}

const propertyService = { 
    getAll, 
    getCount,
    addProperty
};

export default propertyService;