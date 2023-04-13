import { useMemo, useState } from "react";
import { Inter } from "next/font/google";
import clinicsData from "../clinic-info.json";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const inter = Inter({ subsets: ["latin"] });

// Search clinics matching a given zipcode.
function getClinicsInZipcode(zipcode) {
  const filteredClinics = clinicsData.filter(
    (clinic) => clinic.zip === zipcode
  );
  return filteredClinics;
}

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <>Loading...</>;

  return <Map />;
}

const Map = () => {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <GoogleMap
        mapContainerClassName="w-full h-screen"
        zoom={10}
        center={center}
      ></GoogleMap>
    </>
  );
};
