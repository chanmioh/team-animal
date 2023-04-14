import clinicsData from "../../final_clinic_data.json";
import distanceData from "../../02215.json";
import haversine from "haversine-distance";
import Case from "case";

// Get clinics matching given search params.
export function getClinics(searchParams) {
  // let result = getClinicsInRadius(searchParams.zipCode);
  // console.log(result);

  let result = clinicsData;
  const caseFix = (clinic) => {
    clinic.clinic_name = Case.capital(clinic.clinic_name);
    clinic.address1 = Case.capital(clinic.address1);
    clinic.adress2 = Case.capital(clinic.adress2);
    clinic.city = Case.capital(clinic.city);
    return clinic;
  };

  // If there is a zipcode, filter for it in the clinics.
  if (searchParams.zipCode) {
    result = result.filter((clinic) => {
      return clinic.zip === searchParams.zipCode;
    });
  }

  result = result.filter((clinic) => {
    return (
      (!searchParams.whetherInsurance || (clinic.accepts_insurance == searchParams.whetherInsurance)) &&
      (!searchParams.whetherPracticeHub || (clinic.practiceHub == searchParams.whetherPracticeHub)) &&
      (!searchParams.whetherTelevet || (clinic.televet_services == searchParams.whetherTelevet))
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

  if (searchParams.address?.length > 0) {
    result.forEach(clinic => {
      const ddForClinic = distanceData.find(dd => clinic.clinic_name === dd.clinic_name && clinic.address1 === dd.address1 && clinic.adress2 === dd.adress2);
      if (ddForClinic) {
        clinic.walkTime = ddForClinic["walking_time"];;
        clinic.transitTime = ddForClinic["public_transit_time"];
        clinic.drivingTime = ddForClinic["driving_time"];
      }
    });
  }

  return result.map((clinic) => caseFix(clinic));
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
