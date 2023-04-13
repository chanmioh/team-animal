import { useMemo, useState, useReducer } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import clinicsData from "../../final_clinic_data.json";

// Get clinics matching a given zipcode.
function getClinicsForZipcode(zipcode) {
  const filteredClinics = clinicsData.filter(
    (clinic) => clinic.zip === zipcode
  );
  console.log(filteredClinics);
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

function reducer(state, action) {
  switch (action.type) {
    case "zipcodes": {
      console.log(action.zipcode);
      return getClinicsForZipcode(action.zipcode);
    }
    case "categories": {
      return getClinicsForCategories(action.categories);
    }
  }
}

const Map = ({ zipCode }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  //   TODO: Change this to current location
  const center = useMemo(() => ({ lat: 42.359532, lng: -71.057549 }), []);
  const [markers, dispatch] = useReducer(reducer, []);

  if (!isLoaded) return <>Loading...</>;

  return (
    <>
      <GoogleMap
        mapContainerClassName="w-full h-screen"
        zoom={9}
        center={
          markers[0]
            ? {
                lat: parseFloat(markers[0].latitude),
                lng: parseFloat(markers[0].longitude),
              }
            : center
        }
      >
        {markers.map((m, idx) => (
          <Marker
            key={idx}
            position={{
              lat: parseFloat(m.latitude),
              lng: parseFloat(m.longitude),
            }}
          />
        ))}
      </GoogleMap>
    </>
  );
};

export default Map;
