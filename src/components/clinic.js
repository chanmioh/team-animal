export default function Clinic({ clinic }) {
  const takesInsurance = "✔ Takes Insurance";
  const noInsurance = "❌ Doesn't Take Insurance";
  const address = clinic.address1 + (clinic.adress2 ? " " + clinic.adress2 : "") + ", "


  return (
    <div className="border-b-2 space-y-1 px-10 py-6">
      <div className="font-medium">{clinic.clinic_name}</div>
      <div>{address}{clinic.city}, {clinic.state} {clinic.zip}</div>
      <div>{clinic.phone}</div>
      <div>{clinic.accepts_insurance ? takesInsurance : noInsurance}</div>
    </div>
  );
}
