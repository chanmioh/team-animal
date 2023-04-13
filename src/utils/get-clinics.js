import clinicsData from "../../final_clinic_data.json";

// Get clinics matching given search params.
export function getClinics(searchParams) {
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

  // For each category, find the matching clinics.
  for (let i = 0; i < searchParams.categories.length; i++) {
    result = result.filter(
      (clinic) => clinic[searchParams.categories[i]] === 1
    );
  }
  console.log(result);

  return result;
}
