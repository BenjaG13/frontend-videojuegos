import { createContext, useReducer } from "react";
import reducer from "./reducer";

export const AppContext = createContext()

const initialState = {
    success: false
}
export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
 
    const setSuccess = (success) => {
        dispatch( {type:"SUCCESS", payload: success} )  
    }
   
    return (        
        <AppContext.Provider value={{state, setSuccess}}>
            {children}
        </AppContext.Provider>
    )
}
