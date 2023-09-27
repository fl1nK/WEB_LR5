import axios from "axios";
import {logout} from "../reducers/userReducer";

export const getInfo = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/info',
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})

        return response.data
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const setInfo = async (group, variant, phone) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/editing`,
            {
                group,
                variant,
                phone,
            },
            {
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
        alert(response.data.message)

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/admin',
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})

        return response.data
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const deleteUser = async () => {

        try {
            const response = await axios.get(`http://localhost:3001/api/delete`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )

            alert(response.data.message)

        } catch (e) {
            alert(e.response.data.message)
        }
}

export const editInfoAdmin = async (id, group, variant, phone) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/setInfoAdmin`,
            {
                id,
                group,
                variant,
                phone,
            },
            {
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
        alert(response.data.message)

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const setInfoAdmin = async (id, group, variant, phone) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/updateAdmin`,
            {
                id,
                group,
                variant,
                phone,
            },
            {
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
        alert(response.data.message)

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const deleteUserAdmin = async (id) => {

    try {
        const response = await axios.post(`http://localhost:3001/api/deleteAdmin`,
            {
                id,
            },
            {
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })

        alert(response.data.message)

    } catch (e) {
        alert(e.response.data.message)
        console.log(e)
    }
}