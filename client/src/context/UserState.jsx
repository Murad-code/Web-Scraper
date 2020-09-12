import React, { useState, createContext } from 'react'
import Axios from 'axios';

// Context
export const UserContext = createContext();

// Provider Component
export default function UserProvider({ children }) {
    const [userCreated, setUserStatus] = useState(false);
    const [email, setEmail] = useState('');
    const [favourites, setFavourites] = useState();

    const getFavourites = async() => {
        const res = await Axios.get('/get', { email: email });
        if (res.success === false) setUserStatus(false);
        else {
            setFavourites(res.favourites);
        }
    }

    const handleSearch = async(url) => {
        // Scrapes data
        console.log('favourites at beginning: ' + favourites)
        const newFav = await Axios.post('/scrape', { url: url });
        setFavourites((prev) => [...prev, newFav]);
        console.log('favourites after: ' + favourites);

        // Checks if user's email is stored in db already, determines whether to add or update to db
        if (userCreated) {
            await Axios.post('/update', { email: email, url: url });
        } else {
            await Axios.post('/add', { email: email, url: url });
        }
    }


    return (
        <UserContext.Provider value={{
            email,
            setEmail,
            favourites,
        }}>
            {children}
        </UserContext.Provider>
    )
}
