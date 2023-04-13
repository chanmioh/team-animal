import { useMemo, useState, useReducer } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const Map = ({ clinics }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  //   TODO: Change this to current location
  const center = useMemo(() => ({ lat: 42.359532, lng: -71.057549 }), []);

  if (!isLoaded) return <>Loading...</>;

  return (
    <>
      <GoogleMap
        mapContainerClassName="w-full h-screen"
        zoom={9}
        center={
          clinics && clinics[0]
            ? {
                lat: parseFloat(clinics[0].latitude),
                lng: parseFloat(clinics[0].longitude),
              }
            : center
        }
      >
        {clinics?.map((c, idx) => (
          <Marker
            key={idx}
            position={{
              lat: parseFloat(c.latitude),
              lng: parseFloat(c.longitude),
            }}
          />
        ))}
      </GoogleMap>
    </>
  );
};

export default Map;
