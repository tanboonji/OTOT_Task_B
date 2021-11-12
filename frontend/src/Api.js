import axios from 'axios';

const API_URL = 'https://tanboonji-otot-taskb.herokuapp.com';

export async function getAllCustomer() {
    try {
        const res = await axios.get(API_URL + '/getAllCustomer/');
        return res;
    } catch (err) {
        console.log(err);
    }
}

export async function getCustomer(id) {
    try {
        const res = await axios.get(API_URL + '/getCustomer/' + id);
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function createCustomer(id, email, name) {
    try {
        const res = await axios.post(API_URL + '/createCustomer/', {
            "id": id,
            "email": email,
            "name": name
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}

export async function updateCustomer(id, email, name) {
    try {
        const res = await axios.put(API_URL + '/updateCustomer/' + id, {
            "email": email,
            "name": name
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}

export async function deleteCustomer(id) {
    try {
        return await axios.delete(API_URL + '/deleteCustomer/' + id);
    } catch (err) {
        console.log(err);
    }
}