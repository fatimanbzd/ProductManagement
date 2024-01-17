import axios from 'axios'

const axiosInstance = axios.create( {
    baseURL: "http://localhost:5172",
    // withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //         'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token")).data}`
    // }

} )


// Request interceptor
// axiosInstance.interceptors.request.use(
//     (config) => {
//         // Modify the request config here (e.g., add headers, authentication tokens)
//         const accessToken = JSON.parse(localStorage.getItem("token"));
//         debugger;
//
//         // ** If token is present add it to request's Authorization Header
//         return {
//             ...config,
//             headers: {
//                 ...(accessToken !== null && { Authorization: `${accessToken.data}` }),
//                 ...config.headers,
//             },
//         };
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//            console.log(error)
//         }
//         // Handle request errors here
//
//         return Promise.reject(error);
//     }
// );
//
// // Response interceptor
// axiosInstance.interceptors.response.use(
//     (response) => {
//         // Modify the response data here (e.g., parse, transform)
//
//         return response;
//     },
//     (error) => {
//         // Handle response errors here
//
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;