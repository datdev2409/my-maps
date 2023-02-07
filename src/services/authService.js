import axios from "axios"

const authRequest = axios.create({
  baseURL: "http://localhost:8080/auth",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
})

export async function login(email, password) {
  const endpoint = "/login"
  const res = await authRequest.post(endpoint, { email, password })
  return res.data
}
