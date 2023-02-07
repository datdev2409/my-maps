import axios from "axios"
import axiosInherit from "axios-inherit"

const inheritedAxios = axiosInherit(axios)
const userRequest = inheritedAxios.create({
  baseURL: "http://localhost:8080/users",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
})

export async function getMe() {
  const endpoint = "/getMe"
  const res = await userRequest.get(endpoint)
  return res.data?.user
}
