import { useState } from "react"
import { createContext } from "react"

export const langContext = createContext()

export default function ContextProvider(props) {

    const [CartLength, setCartLength] = useState(0)
    return (
        <>
            <langContext.Provider value={{ CartLength, setCartLength }}>
                {props.children}
            </langContext.Provider>
        </>
    )
}
