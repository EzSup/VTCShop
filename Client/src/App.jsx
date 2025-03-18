import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Root from "./components/Root";
import AboutUs from "./components/About";
import ContactUs from "./components/Contact";
import CollectionPage from "./components/CollectionPage";
import ItemDetails from "./components/ItemDetails/ItemDetails";

const App = () => {
  return (
      <Router basename="/Dev_test-react">
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/Contacts" element={<ContactUs />} />
          <Route path="/Collection" element={<CollectionPage />} />
          <Route path="/item/:id" element={<ItemDetails />} />
        </Routes>
      </Router>
  );
};
export default App;
