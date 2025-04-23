import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Root from "./components/Root";
import AboutUs from "./components/About";
import ContactUs from "./components/Contact";
import CollectionPage from "./components/CollectionPage";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import LoginPage from "./components/Login/LoginPage";
import Cart from "./components/ItemDetails/Cart";
import AdminPage from "./components/Admin/AdminPage";
import ProductManage from "./components/Admin/ProductManage";

const App = () => {
  return (
    <Router basename="/Dev_test-react/">
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/Contacts" element={<ContactUs />} />
        <Route path="/Collection" element={<CollectionPage />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<ProductManage />} />
          <Route path="products" element={<ProductManage />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
