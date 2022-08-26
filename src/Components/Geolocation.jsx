import React, { useEffect, useState } from 'react'

const Geolocation = () => {
    const [locationPosition, setLocationPosition] = useState([]);

    useEffect(() => {
        if(!navigator.geolocation){
            alert("Geolocation is not supported in your browser");
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocationPosition({
                    ...position,
                    defaultLatitude: position.coords.latitude,
                    defaultLongitude: position.coords.longitude
                });
            });
        }
    }, []);

    

    return (
    <div>

    </div>
  )
}

export default Geolocation;