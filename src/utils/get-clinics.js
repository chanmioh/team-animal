import clinicsData from "../../final_clinic_data.json";

// Get clinics matching given search params.
export function getClinics(searchParams) {
  let result = clinicsData;

  result = result.filter((clinic) => clinic.zip === searchParams.zipCode);

  const categories = searchParams.categories;

  // For each category, find the matching clinics.
  for (let i = 0; i < categories.length; i++) {
    result = result.filter((clinic) => clinic[categories[i]] === 1);
  }
  console.log(result);

  return result;
}
