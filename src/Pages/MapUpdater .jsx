// MapUpdater.js
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const MapUpdater = ({ location }) => {
    const map = useMap();

    useEffect(() => {
        if (location) {
            map.setView([location.latitude, location.longitude], 15, {
                duration: 1.5,
                animate: true
            });
        }
    }, [location, map]);

    return null;
};

export default MapUpdater;
