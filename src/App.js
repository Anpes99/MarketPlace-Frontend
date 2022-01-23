import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePageView from "./components/HomePage/HomePageView";
import ItemsPageView from "./components/ItemsPage/ItemsPageView";
import SellItemForm from "./components/SellItemForm";

const App = () => {
  // const [user, setUser] = useState(null);

  /* useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    console.log("logged user :  ", loggedInUser);
    loggedInUser !== null ? setUser(JSON.parse(loggedInUser)) : setUser(null);
  }, []);*/

  return (
    <div>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/browse" element={<ItemsPageView />} />
            <Route path="/sell" element={<SellItemForm />} />
            <Route path="/" element={<HomePageView />} />
          </Routes>{" "}
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
