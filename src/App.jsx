import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Signin from "./pages/Auth/Signin/Signin";
import Signup from "./pages/Auth/Signup/Signup";
import HomePage from "./pages/HomePage/HomePage";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Basket from "./pages/Basket/Basket";
import Error404 from "./pages/Error404/Error404";
import ProductedProfile from "./pages/ProductedRoute/ProductedProfile";
import ProductedAdmin from "./pages/ProductedRoute/ProductedAdmin";
import AdminProducts from "./pages/Admin/AdminProducts/AdminProducts";
import AdminProductDetail from "./pages/Admin/AdminProductDetail/AdminProductDetail";
import NewProduct from "./pages/NewProduct/NewProduct";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div id="content">
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/profile" element={<ProductedProfile />} />
          <Route path="/admin">
            <Route index element={<ProductedAdmin />} />
            <Route path="products">
              <Route index element={<AdminProducts />} />
              <Route path=":product_id" element={<AdminProductDetail />} />
              <Route path="new" element={<NewProduct />} />
            </Route>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
