import axios from "axios"

export const updateAirports = (id, newObject) => {
  const res = axios.put(`http://localhost/update/${id}`, newObject)
  return res.then(response => response.data)
}