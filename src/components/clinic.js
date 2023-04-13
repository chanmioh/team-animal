export default function Clinic({ clinic }) {
  const takesInsurance = "✔ Takes Insurance";
  const noInsurance = "❌ Doesn't Take Insurance";

  return (
    <div className="border-b-2 space-y-1 px-10 py-6">
      <div className="font-medium">{clinic.clinic_name}</div>
      <div>{clinic.address}</div>
      <div>{clinic.phone}</div>
      <div>{clinic.accepts_insurance ? takesInsurance : noInsurance}</div>
    </div>
  );
}
