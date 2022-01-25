import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePageView from "./components/HomePage/HomePageView";
import ItemsPageView from "./components/ItemsPage/ItemsPageView";
import SellView from "./components/SellView";
import UserContext from "./contexts/UserContext";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    let loggedInUser = localStorage.getItem("loggedInMarketPlaceUser");

    if (loggedInUser) {
      loggedInUser = await axios.get(
        "http://localhost:3001/api/users/anpes99/favourites?fields=id"
      );
      setUser(loggedInUser);
    } else {
      setUser(null);
    }
  }, []);

  // useContext(AuthStorageContext);

  return (
    <div>
      <Router>
        <UserContext.Provider value={user}>
          <Header />
          <main>
            <Routes>
              <Route path="/browse" element={<ItemsPageView />} />
              <Route path="/sell" element={<SellView />} />
              <Route path="/" element={<HomePageView />} />
            </Routes>{" "}
          </main>
          <Footer />
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
