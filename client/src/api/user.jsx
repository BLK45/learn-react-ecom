import axios from "axios"

export const createUserCart = async(token, cart)=>{
    return axios.post('http://localhost:5000/api/user/cart',cart,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const listUserCart = async (token) => {
  // code body
  return axios.get("http://localhost:5000/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const saveAddress = async (token, address) => {
  // code body
  return axios.post("http://localhost:5000/api/user/address", {address}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const saveOrder = async (token, payload) => {
  // code body
  return axios.post("http://localhost:5000/api/user/order", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};