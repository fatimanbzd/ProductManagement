import "./App.css";
import Layout from "./components/shared/layout";
import AddProduct from "./components/pages/product/addProduct";
import AllProduct from "./components/pages/product/productList";
import { Route, Routes } from "react-router-dom";
import UpdateProduct from "./components/pages/product/editProduct";
import Home from "./components/pages/home";
import AllCustomer from "./components/pages/customer/customerList";
import AddCustomer from "./components/pages/customer/addCustomer";
import UpdateCustomer from "./components/pages/customer/editCustomer";
import AddCustomerOrder from "./components/pages/order/customerOrder/addCustomerOrder";
import UrlContextProvider, { } from "./context/urlContext";
import Login from "./components/pages/user/login";
import useToken from './components/useToken';


function App() {

  //const { token, setToken } = useToken();

 // if(!token) {
  //  return <Login />
  //}
  return (
//
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Home></Home>}></Route>
//           <Route path="/products" element={<AllProduct> </AllProduct>}></Route>
//           <Route
//             path="/add-product"
//             element={<AddProduct></AddProduct>}
//           ></Route>
//           <Route
//             path="/edit-product/:id"
//             element={<UpdateProduct></UpdateProduct>}
//           ></Route>
//           <Route
//             path="/customers"
//             element={<AllCustomer> </AllCustomer>}
//           ></Route>
//           <Route
//             path="/add-customer"
//             element={<AddCustomer></AddCustomer>}
//           ></Route>
//           <Route
//             path="/edit-customer/:id"
//             element={<UpdateCustomer></UpdateCustomer>}
//           ></Route>
//           <Route
//             path="/add-customerOrder"
//             element={<AddCustomerOrder></AddCustomerOrder>}
//           ></Route>
//           <Route
//           path="/login"
//           element={<Login></Login>}>
//           </Route>
//         </Routes>
//       </Layout>
//   );
// }

export default App;
