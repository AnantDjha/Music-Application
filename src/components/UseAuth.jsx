import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UseAuth(code)
{
    const [accessToken,setAccessToken] = useState()
    const [refreshToken,setRefreshToken] = useState()
    const [expireIn,setExoireIn] = useState()

    useEffect(()=>{
        axios.post("http://localhost:3000/login",{
            code
        }).then((res)=>{
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            // setExoireIn(61)
            setExoireIn(res.data.expireIn)
            // window.history.pushState({},null,"/")
        }).catch(()=>{
            window.location = "/"
        })
    },[code])

    useEffect(()=>{
        if(!refreshToken || !expireIn) return;

        const timeOut = setInterval(()=>{
                axios.post("http://localhost:3000/refresh",{
                refreshToken
            }).then((res)=>{
                
                setAccessToken(res.data.accessToken)
                setExoireIn(res.data.expireIn)
                // setExoireIn(61)
                
            }).catch(()=>{
                window.location = "/"
        })

        },(expireIn-60)*1000)
        
        return ()=> clearInterval(timeOut);
        
    },[expireIn,refreshToken])
    return accessToken;
}