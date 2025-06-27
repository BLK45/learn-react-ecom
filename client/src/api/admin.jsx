import axios from 'axios'

export const getOrdersAdmin = async(token)=>{
    return axios.get('http://localhost:5000/api/admin/orders', {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}