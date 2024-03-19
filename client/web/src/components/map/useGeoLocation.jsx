import { useEffect, useState } from "react";

export default function useGeoLocation () {
    const [location , setLocation] = useState({
        loaded : false,
        coordinates : {
            lat: "",
            lng: "",
        }
    })

    const onSuccess = (position)=>{
        console.log("POSITION : ", position)
        setLocation({
            loaded : true,
            coordinates : {
                lat : position.coords.latitude,
                lng : position.coords.longitude,
            }
        })
    }

    const onError = (error)=>{
        setLocation({
            loaded : true,
            error,
        })

    }
    useEffect(()=>{
        if(!("geolocation" in navigator)){
           onError({
            code : 0,
            message : "Geolocaion not supported",
           })
        }

        navigator.geolocation.getCurrentPosition(onSuccess , onError)
    },[])

    return location
}