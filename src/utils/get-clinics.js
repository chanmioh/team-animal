import clinicsData from "../../final_clinic_data.json";
import haversine from "haversine-distance";

// Get clinics matching given search params.
export function getClinics(searchParams) {
  // let result = getClinicsInRadius(searchParams.zipCode);
  // console.log(result);

  let result = clinicsData;
  // If there is a zipcode, filter for it in the clinics.
  if (searchParams.zipCode) {
    result = result.filter((clinic) => {
      return clinic.zip === searchParams.zipCode;
    });
  }

  result = result.filter((clinic) => {
    return (
      clinic.accepts_insurance == searchParams.whetherInsurance &&
      clinic.practiceHub == searchParams.whetherPracticeHub &&
      clinic.televet_services == searchParams.whetherTelevet
    );
  });

  const categoriesAndSpecialties = searchParams.categories.concat(
    searchParams.specialties
  );

  // For each category, find the matching clinics.
  for (let i = 0; i < categoriesAndSpecialties.length; i++) {
    result = result.filter((clinic) => {
      return clinic[categoriesAndSpecialties[i]] === 1;
    });
  }
  console.log(result);

  return result;
}

export function getClinicsInRadius(zipcode) {
  const radius = 1;
  const matchingZipcodeClinic = clinicsData.find((c) => c.zip === zipcode);

  if (matchingZipcodeClinic) {
    const zipcodeCoords = {
      lat: matchingZipcodeClinic.latitude,
      lng: matchingZipcodeClinic.longitude,
    };

    console.log(zipcodeCoords);

    const results = clinicsData.filter((c) => {
      const dist =
        haversine(zipcodeCoords, {
          lat: parseFloat(c.latitude),
          lng: parseFloat(c.longitude),
        }) * 0.000621;
      return dist <= radius;
    });

    return results;
  }
  return clinicsData;
}
