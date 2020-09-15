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
            const db = await Axios.post('/get', { email: email });
            let curr;
            try {
                console.log('in try statement');
                curr = db.data.favourites[0].favourites;
                setUserStatus(true);
                setTempFavourites(curr);
            } catch (err) {
                console.log('in catch statement');
                setUserStatus(false);
            }
        };
        loadData();
      }
  }, [email])

  const handleSearch = async(url) => {
    // Data after scraping the url stored as object
    const res = await Axios.post("/scrape", { url: url });
    const newFav = res.data.data;

    const db = await Axios.post('/get', { email: email });
    let curr;
    try {
        curr = db.data.favourites[0].favourites;
        console.log('curr: '+ curr);
        setUserStatus(true);

        // Check for duplicates here
        

        setFavourites(() => [newFav, ...curr]);
    } catch (err) {
        setUserStatus(false);
        console.log("New user");
        setFavourites(() => [newFav]);
    }
  }

  return (
    <UserContext.Provider
      value={{
        isSignedIn,
        setSignInStatus,
        setEmail,
        handleSearch,
        favourites,
        tempFavourites
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
