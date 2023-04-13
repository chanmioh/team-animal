import { useMemo, useState, useReducer } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import clinicsData from "../../final_clinic_data.json";

// Get clinics matching a given zipcode.
function getClinicsForZipcode(zipcode) {
  const filteredClinics = clinicsData.filter(
    (clinic) => clinic.zip === zipcode
  );
  return filteredClinics;
}

// Get clinics containing all the given categories.
export function getClinicsForCategories(categories) {
  let result = clinicsData;
  // For each category, find the matching clinics.
  for (let i = 0; i < categories.length; i++) {
    result = result.filter((clinic) => clinic[categories[i]] === 1);
  }
  console.log(result);
  return result;
}

function reducer(state, action, payload) {
  switch (action.type) {
    case "zipcodes": {
      return getClinicsForZipcode(payload.zipcode).map((c, idx) => (
        <Marker
          key={idx}
          position={{
            lat: parseFloat(c.latitude),
            lng: parseFloat(c.longitude),
          }}
        />
      ));
    }
  }
}

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  //   TODO: Change this to current location
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [markers, dispatch] = useReducer(reducer, []);

  if (!isLoaded) return <>Loading...</>;

  return (
    <>
      <GoogleMap
        mapContainerClassName="w-full h-screen"
        zoom={10}
        center={center}
      >
        {markers}
      </GoogleMap>
    </>
  );
};

export default Map;
