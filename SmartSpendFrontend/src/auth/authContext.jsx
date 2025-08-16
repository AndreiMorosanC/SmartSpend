import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../lib/api";

const AuthContext = createContext({ user: null, loading:true});


export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const refreshSession = useCallback(async()=>{
        try{
            const { data } = await api.get("/api/me");
            setUser(data.user || null);
        }catch{
            setUser(null)
        }finally{
            setLoading(false)
        }
    }, [])

    useEffect(()=>{
        refreshSession();
    },[refreshSession])


    return(
        <AuthContext.Provider value={{user,setUser,loading,refreshSession}}>
            {children}
        </AuthContext.Provider>
    )

   
}

 export function useAuth(){
       return useContext(AuthContext); 
    }