import Clinic from "../components/clinic.js";

export default function Results({clinics, onSeeMore}) {
  if (!clinics) {
    return <>No clinics found</>;
  }

  return (
    <div className="overflow-auto flex flex-col">
      {clinics.map((c, idx) => (
        <button onClick={() => onSeeMore(c)}>
          <Clinic key={idx} clinic={c} />
        </button>
      ))}
    </div>
  );
}
