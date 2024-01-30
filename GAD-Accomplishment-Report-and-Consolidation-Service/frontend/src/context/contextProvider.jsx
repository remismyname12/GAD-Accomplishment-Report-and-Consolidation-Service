import React, { useState } from 'react'
import { createContext } from 'react'

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {}
})

export const contextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userTokent, setUserToken] = useState('1234');

    return (
        <StateContext.Provider value = {{
            currentUser,
            setCurrentUser,
            userTokent,
            setUserToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)