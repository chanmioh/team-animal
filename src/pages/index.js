import { useMemo, useState } from "react";
import { Inter } from "next/font/google";
import clinicsData from "../clinic-info.json";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Select from "react-select";

const inter = Inter({ subsets: ["latin"] });

// Search clinics matching a given zipcode.
function getClinicsInZipcode(zipcode) {
  const filteredClinics = clinicsData.filter(
    (clinic) => clinic.zip === zipcode
  );
  return filteredClinics;
}

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <>Loading...</>;

  return <Map />;
  // // Field values
  // const [categories, setCategories] = useState([])
  // const [zipCode, setZipCode] = useState()
  // const [whetherInsurance, setWhetherInsurance] = useState(false)
  // const [whetherPracticeHub, setWhetherPracticeHub] = useState(false)
  // const [whetherTelevet, setWhetherTelevet] = useState(false)

  // // Field validation
  // const [zipValidation, setZipValidation] = useState()

  // const options = [
  //   { value: 'Canine and Feline', label: '🐱🐶 Cat & Dog' },
  //   { value: 'Avian', label: '🦜 Bird' },
  //   { value: 'Reptile and Amphibian', label: '🐍🐟🐸 Reptiles & Amphibians' },
  //   { value: 'Exotic', label: '🐯🐵 Exotic' },
  //   { value: 'Equine', label: '🐴 Horse' },
  //   { value: 'Beef Cattle', label: '🐄 Beef Cattle' },
  //   { value: 'Dairy', label: '🥛 Dairy Cattle' }
  // ]
  // return (
  //   <div className="min-h-screen max-w-[40vw] p-10 bg-white">
  //     <div className="flex flex-col space-y-4">

  //       {/* Animal selector */}
  //       <label>
  //         <span className="label-text">Animal Category</span>
  //         <Select isMulti options={options} onChange={newValue => setCategories(newValue.map(value => value.value))} />
  //       </label>

  //       {/* Zip input */}
  //       <div className="form-control">
  //         <label className="label">
  //           <span className="label-text">Area Code</span>
  //         </label>
  //         <input type="text" placeholder="e.g. 12345"
  //           className={`input input-bordered
  //             ${zipValidation == "incomplete" && "input-warning"}
  //             ${zipValidation == "malformed" && "input-error"}
  //             w-full`}
  //           onChange={e => {
  //             const newZip = e.target.value;
  //             setZipCode(newZip);
  //             if (newZip.length < 5 && newZip.length > 0) {
  //               setZipValidation("incomplete")
  //             } else if (newZip.length > 5) {
  //               setZipValidation("malformed")
  //             } else {
  //               setZipValidation()
  //             }
  //           }} />
  //       </div>

  //       {/* Insurance toggle  */}
  //       <label className="label cursor-pointer">
  //         <span className="label-text">Has Insurance</span>
  //         <input type="checkbox" className="toggle"
  //           checked={whetherInsurance}
  //           onClick={() => setWhetherInsurance(!whetherInsurance)}/>
  //       </label>

  //       {/* PracticeHub toggle */}
  //       <label className="label cursor-pointer">
  //         <div className="tooltip tooltip-right" data-tip="hello">
  //           <span className="label-text">PracticeHub</span>
  //         </div>
  //         <input type="checkbox" className="toggle"
  //           checked={whetherPracticeHub}
  //           onClick={() => setWhetherPracticeHub(!whetherPracticeHub)}/>
  //       </label>

  //       {/* Televet toggle  */}
  //       <label className="label cursor-pointer">
  //         <span className="label-text">Offers Televet</span>
  //         <input type="checkbox" className="toggle"
  //           checked={whetherTelevet}
  //           onClick={() => setWhetherTelevet(!whetherTelevet)}/>
  //       </label>

  //       {/* Specialization selector */}
  //       <label>
  //         <span className="label-text">Specialization</span>
  //         <Select isMulti options={options} />
  //       </label>

  //       <button className={`btn ${zipValidation ? "btn-disabled" : ""}`}>Search</button>
  //     </div>
  //   </div>
  // )
}

const Map = () => {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <GoogleMap
        mapContainerClassName="w-full h-screen"
        zoom={10}
        center={center}
      ></GoogleMap>
    </>
  );
};
