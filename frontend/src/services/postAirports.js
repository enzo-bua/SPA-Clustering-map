import axios from "axios"

export const postAirports = (newObject) => {
  const res = axios.post(`http://localhost/add`, newObject)
  return res.then(response => response.data)
}