import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import axios from "axios";
import Spinner from "./Spinner";
import pin from "@/assets/images/pin.svg";
import Image from "next/image";

const PropertyMap = ({ property }) => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: "100%",
        height: "500px",
    });
    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;
                const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
                const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${apiKey}`;

                const response = await axios.get(url);

                if (response.data.results.length === 0) {
                    setGeocodeError(true);
                    setLoading(false);
                    return;
                }

                const { lat, lng } = response.data.results[0].geometry;

                setLat(lat);
                setLng(lng);
                setViewport({
                    ...viewport,
                    latitude: lat,
                    longitude: lng,
                });

                setLoading(false);
            } catch (error) {
                console.log(error);
                setGeocodeError(true);
                setLoading(false);
            }
        };

        fetchCoords();
    }, []);

    if (loading) return <Spinner loading={loading} />;

    // Handle case where geocoding failed
    if (geocodeError) {
        return <div className="text-xl">No location data found</div>;
    }

    return (
        !loading && (
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapLib={import("mapbox-gl")}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 15,
                }}
                style={{ width: "100%", height: 500 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker
                    longitude={lng}
                    latitude={lat}
                    anchor="bottom"
                >
                    <Image
                        src={pin}
                        alt="location"
                        width={40}
                        height={40}
                    />
                </Marker>
            </Map>
        )
    );
};
export default PropertyMap;
