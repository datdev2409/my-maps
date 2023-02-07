import axios, { Axios } from "axios"
import { createStorage, tokenStorage } from "../services/localStorageService"

export default function configAxios() {
  axios.interceptors.request.use(function (config) {
    const access_token = tokenStorage.get()
    if (access_token) config.headers.Authorization = "Bearer " + access_token

    return { ...config }
  })
}
