import Clinic from "../components/clinic.js";

export default function Results(props) {
  if (!props.clinics) {
    return <>No clinics found</>;
  }

  return (
    <div className="overflow-auto flex flex-col bg-white">
      {props.clinics.map((c, idx) => (
        <Clinic key={idx} clinic={c} />
      ))}
    </div>
  );
}
