import React, { useState, useEffect, useRef, createContext } from "react";
import Axios from "axios";

// Context
export const UserContext = createContext();

// Provider Component
export default function UserProvider({ children }) {
  const [isSignedIn, setSignInStatus] = useState(false);
  const [userCreated, setUserStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [tempFavourites, setTempFavourites] = useState([]);

  const [notification, setNotification] = useState(false);

  const isInitialMount = useRef(true);
  const isInitialMount2 = useRef(true);

  // useEffect used to detect when favourites state changes because setState doesn't follow async/await
  useEffect(() => {
    // This if statement stops useEffect running sendData on initialisation
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const sendData = async () => {
        if (!userCreated) {
          // When user's email isnt stored in db, create a record for that email
          console.log("in if statement");
          await Axios.post("/add", { email: email, favourites: favourites });
        } else {
          // When user has email in db, update the favourites field
          console.log("in else statement");
          await Axios.put("/update", { email: email, favourites: favourites });
        }
      };
      sendData();
    }
  }, [favourites]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const loadData = async () => {
        const db = await Axios.post("/get", { email: email });
        let curr;
        try {
          console.log("try: email");
          curr = db.data.favourites[0].favourites;
          setUserStatus(true);
          setTempFavourites(curr);
        } catch (err) {
          console.log("catch: email");
          setUserStatus(false);
        }
      };
      loadData();
    }
  }, [email]);

  const checkUrl = async (url) => {
    const db = await Axios.post("/get", { email: email });
    let curr;
    try {
      curr = db.data.favourites[0].favourites;
      // Check for duplicates here
      for (let i = 0; i < curr.length; i++) {
        if (url === curr[i].url) {
          setNotification(true);
          return null;
        }
      }
      return curr;
    } catch (err) {
      // If there is no user data in DB then it can't be a duplicate returns undefined
      return curr;
    }
  };

  const handleSearch = async (url) => {
    const preFav = await checkUrl(url);
    // If preFav is null then the current url is a duplicate and is already in DB
    if (preFav !== null) {
      // Data after scraping the url stored as object
      const res = await Axios.post("/scrape", { url: url });
      const newFav = res.data.data;

      // If preFav is not undefined then user is already stored in the DB
      if (preFav !== undefined) {
        console.log("preFav: " + preFav);
        setUserStatus(true);

        setFavourites(() => [newFav, ...preFav]);
      } 
      // preFav is undefined so user is not stored in the DB
      else {
        setUserStatus(false);
        console.log("New user");
        setFavourites(() => [newFav]);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        isSignedIn,
        setSignInStatus,
        setEmail,
        handleSearch,
        favourites,
        tempFavourites,
        notification,
        setNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
