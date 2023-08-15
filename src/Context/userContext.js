import { createContext } from "react";

export let userContext = createContext()




export function userLogOut() {
    localStorage.removeItem('userToken')
}


export function UserContextProvider(props) {
    return <userContext.Provider value={{ userLogOut }}>
        {props.children}
    </userContext.Provider>
}
