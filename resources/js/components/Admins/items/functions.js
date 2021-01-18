import axios from 'axios';

const url = 'http://localhost:8000/api/admins/';
const token = {Authorization: `bearer ${localStorage.adminsToken}`}


export const addItem = async (admins_id, formdata) => {

    return await axios.post(
        url + "add/item/" + admins_id, formdata,
        {
            headers: token
        }
    ).then(res => {
        return res
    }).catch(err => {
        console.log(err);
    });
}

export const getItems = async () => {

    return await axios.get(
        url + "get/items/",
        {
            headers: token
        }
    ).then(res => {
        return res
    }).catch(err => {
        console.log(err);
    });
}

export const handlePage = async (pageNumber) => {

    return await axios.get(
        url + "get/items?page=" + pageNumber,
        {
            headers: token
        }
    ).then(res => {
        return res
    }).catch(err => {
        console.log(err);
    });
}

export const editItem = async (id) => {

    return await axios.get(
        url + "edit/item/" + id,
        {
            headers: token
        }
    ).then(res => {
        return res
    }).catch(err => {
        console.log(err);
    });
}

export const updateItem = async (id, formData) => {

    return await axios.post(
        url + "update/item/" + id, formData,
        {
            headers: token
        }
    ).then(res => {
        return res
    }).catch(err => {
        console.log(err);
    });
}

export const deleteItem = async (id) => {

    return await axios.delete(
        url + "delete/item/" + id,
        {
            headers: token
        }
    ).then(res => {
        return res
    }).catch(err => {
        console.log(err);
    });
}
