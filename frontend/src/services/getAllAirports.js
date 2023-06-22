import axios from "axios"

export const getAllAirports = () => {
  const res = axios.get('http://localhost/airports')
  return res.then(response => response.data)
}
