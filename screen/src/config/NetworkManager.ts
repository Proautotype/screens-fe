import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1/examination",
})

instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (config.url !== "/login") {
      config.headers.setAuthorization("Bearer ");
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  })

instance.interceptors.response.use((res) => {
  return res
}, async (error) => {
  const originalConfig = error.config;
  //see if error is not from login or getting auth url
  if (originalConfig.url !== "/auth/token" && error.response) {
    //if error is unauthorized (401), set retry to true
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {

      }catch (e) {

      }
    }
  }
})

export default instance;