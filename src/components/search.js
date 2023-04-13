import Image from "next/image";
import Select from "react-select";
import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function Search(props) {
  // Field values
  let categories = [];
  const [zipCode, setZipCode] = useState("");
  const [whetherInsurance, setWhetherInsurance] = useState(false);
  const [whetherPracticeHub, setWhetherPracticeHub] = useState(false);
  const [whetherTelevet, setWhetherTelevet] = useState(false);
  const [whetherEmergency, setWhetherEmergency] = useState(false);

  // Field validation
  const [zipValidation, setZipValidation] = useState();

  const categoriesOptions = [
    { value: "Canine and Feline", label: "🐱🐶 Cat & Dog" },
    { value: "Avian", label: "🦜 Bird" },
    { value: "Reptile and Amphibian", label: "🐍🐟🐸 Reptiles & Amphibians" },
    { value: "Exotic", label: "🐯🐵 Exotic" },
    { value: "Equine", label: "🐴 Horse" },
    { value: "Food Animal", label: "🍔 Food Animal" },
    { value: "Beef Cattle", label: "🐄 Beef Cattle" },
    { value: "Dairy", label: "🥛 Dairy Cattle" },
  ];

  const specialitiesOptions = [
    /*'Nutrition', 'Oncology', 'Cardiology', 'Neurology',
        'Dermatology', 'Radiology'
    */
    { value: "Nutrition", label: "Nutrition" },
    { value: "Oncology", label: "Oncology" },
    { value: "Cardiology", label: "Cardiology" },
    { value: "Neurology", label: "Neurology" },
    { value: "Dermatology", label: "Dermatology" },
    { value: "Radiology", label: "Radiology" },
  ];

  return (
    <div className="flex flex-col space-y-16">
      <div className="flex flex-col space-y-4">
        {/* Animal selector */}
        <label>
          <span className="label-text">Animal Category</span>
          <Select
            isMulti
            options={categoriesOptions}
            onChange={(newValue) =>
              (categories = newValue.map((value) => value.value))
            }
          />
        </label>

        {/* Zip input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Area Code</span>
          </label>
          <input
            type="num"
            placeholder="e.g. 12345"
            className={`input input-bordered 
                    ${zipValidation == "incomplete" && "input-warning"} 
                    ${zipValidation == "malformed" && "input-error"} 
                    w-full`}
            onChange={(e) => {
              const newZip = e.target.value;
              setZipCode(newZip);
              if (newZip.length > 5 || !newZip.match(`^[0-9]*$`)) {
                setZipValidation("malformed");
              } else if (newZip.length < 5 && newZip.length > 0) {
                setZipValidation("incomplete");
              } else {
                setZipValidation();
              }
            }}
          />
        </div>

        {/* Insurance toggle  */}
        <label className="label cursor-pointer">
          <span className="label-text">Accepts Insurance</span>
          <input
            type="checkbox"
            className="toggle"
            checked={whetherInsurance}
            onChange={() => setWhetherInsurance(!whetherInsurance)}
          />
        </label>

        {/* PracticeHub toggle */}
        <label className="label cursor-pointer space-x-4">
          <span
            className="label-text flex space-x-2 tooltip tooltip-right"
            data-tip="Our integrated online pharmacy platform!"
          >
            <p>Chewy Practice Hub</p> <InformationCircleIcon className="h-4" />
          </span>
          <input
            type="checkbox"
            className="toggle"
            checked={whetherPracticeHub}
            onClick={() => setWhetherPracticeHub(!whetherPracticeHub)}
          />
        </label>

        {/* Televet toggle  */}
        <label className="label cursor-pointer">
          <span
            className="label-text flex space-x-2 tooltip tooltip-right"
            data-tip="Connect with veterinarians about questions!"
          >
            <p>TeleVet Services</p> <InformationCircleIcon className="h-4" />
          </span>
          <input
            type="checkbox"
            className="toggle"
            checked={whetherTelevet}
            onClick={() => setWhetherTelevet(!whetherTelevet)}
          />
        </label>

        {/* Emergency toggle  */}
        <label className="label cursor-pointer">
          <span className="label-text"> Emergency Services</span>
          <input
            type="checkbox"
            className="toggle"
            checked={whetherEmergency}
            onClick={() => setWhetherEmergency(!whetherEmergency)}
          />
        </label>

        {/* Specialization selector */}
        <label>
          <span className="label-text">Specialization</span>
          <Select isMulti options={specialitiesOptions} />
        </label>
      </div>

      <button
        className={`btn ${zipValidation ? "btn-disabled" : ""} w-fit self-end`}
        onClick={() => {
          props.onSearch({
            categories,
            zipCode,
            whetherInsurance,
            whetherPracticeHub,
            whetherTelevet,
          });
        }}
      >
        Search
      </button>
    </div>
  );
}
