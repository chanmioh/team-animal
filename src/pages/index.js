import Image from "next/image";
import Select from "react-select";
import { useState } from "react";
import { Search } from "../components/search.js";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Map from "./Map.js";
import { getClinics } from "../utils/get-clinics.js";
import Results from "./Results.js";
import { Details } from "../components/details.js";
import {Toast} from "../components/toast.js";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("search"); // search, result, clinic
  const [currentClinic, setCurrentClinic] = useState(); // search, result, clinic
  const [clinics, setClinics] = useState([]);
  const [showToast, setShowToast] = useState(false);

  let searchCriteria;

  // Force light mode
  if (typeof window !== 'undefined') {
    localStorage.theme = 'light'
  }

  const backButton = () => {
    switch (currentPage) {
      case "result":
        setCurrentPage("search");
        return;
      case "clinic":
        setCurrentClinic();
        setCurrentPage("result");
        return;
      default:
        return;
    }
  };

  return (
    <div>
      {/* Toast for no results */}
      {showToast && <Toast onClose={() => setShowToast(false)}></Toast>}

      {/* Map */}
      <Map
        clinics={clinics}
        currentClinic={currentClinic}
        setCurrentClinic={setCurrentClinic}
        setCurrentPage={setCurrentPage}
      />

      {/* Drawer */}
      <div
        className={`fixed bg-primary-content top-0 left-0 h-screen w-80 p-6 min-w-lg max-w-[40vw] overflow-x-visible
      flex flex-col drop-shadow-2xl`}
      >
        {/* Back Button */}
        <button className="max-w-fit">
          <ArrowLeftIcon
            className={`h-8 self-start ${
              currentPage == "search" && "invisible"
            }`}
            onClick={() => {
              backButton();
            }}
          />
        </button>

        {/* Chewy Logo */}
        <div className="min-w-fit">
          <svg
            className="fill-primary"
            viewBox="0 0 106 32"
            role="img"
            focusable="false"
            aria-label="Chewy Home"
          >
            <path d="M54.237 15.497c-.653 1.377-.924 2.776-3.217 3.709-2.238.91-4.283-.42-4.961-1.675 0 0 7.41-3.424 9.594-4.742.659-.398 1.165-.856 1.5-1.372.268.681.592 1.486.95 2.356-1.447-.557-3.061.027-3.866 1.724m-7.99-6.587c3.06-1.448 4.765 1.526 4.765 1.526l-6.719 3.178s-1.106-3.257 1.954-4.704m57.306-2.554c-1.925-.648-3.732.431-4.314 2.24l-3.242 10.077-.081-.004c-1.03-4.352-2.437-10.31-2.437-10.31-.438-1.85-2.154-3.074-4.124-2.586a3.449 3.449 0 0 0-1.852 1.148c-.2-1.438-1.283-2.61-2.882-2.816-1.973-.254-3.524 1.141-3.764 3.004l-1.332 10.378-.08.008-2.758-7.643c-1.122-3.109-2.04-4.72-4.828-4.404-2.79.317-3.337 2.094-3.762 5.378l-1.044 8.075-.08.009-3.535-9.826c-.635-1.763-2.449-2.776-4.319-2.087a3.361 3.361 0 0 0-1.78 1.476c-1.396-3.65-6.807-7.16-13.451-3.524-3.462 1.895-5.073 4.507-5.597 7.132-.97-2.256-2.957-3.84-5.605-4.08-3.57-.324-5.576 1.779-5.576 1.779l-.072-.006.52-5.965c.166-1.915-1.089-3.608-3.135-3.793-2.047-.186-3.586 1.28-3.75 3.17l-1.238 14.209c-.615-.662-1.547-1.053-2.635-.776-2.193.536-2.754 3.191-5.084 3.68-2.644.555-4.317-1.548-4.827-4.077-.418-2.077-.06-5.137 2.878-5.587 2.58-.396 3.184 2.346 6.055 1.768 1.7-.343 2.52-1.707 2.123-3.45-.626-2.642-4.737-4.582-9.25-3.636C2.89 6.535-1.035 11.814.242 18.436c1.32 6.844 7.662 9.062 12.679 7.943 3.107-.693 4.978-2.133 6.046-3.612l-.068.773c-.166 1.915 1.089 3.608 3.135 3.793 2.047.186 3.586-1.28 3.75-3.17l.707-8.113c.192-2.269 1.697-3.102 3.008-2.983 1.31.118 2.625 1.375 2.45 3.478l-.706 8.113c-.167 1.916 1.089 3.608 3.135 3.794 2.046.185 3.585-1.28 3.75-3.17l.624-7.17c.14.412.294.803.461 1.17C42.27 26 48.53 26.429 53.41 24.12c2.837-1.342 4.507-2.97 5.497-4.466.443-.67.73-1.294.894-1.868.368.843.738 1.672 1.095 2.445 2.353 5.09 3.173 6.345 6.925 6.018 3.73-.522 4.093-2.08 5.091-10.777l.04-.004.04-.005c2.847 8.261 3.537 9.7 7.288 9.373 3.73-.522 4.26-1.93 5.46-7.423a172.47 172.47 0 0 0 1.306-6.764l.83 2.736c2.006 6.58 4.087 10.944 2.833 11.58-1.115.564-1.76-1.418-3.907-1.283-1.477.093-2.783 1.67-2.307 3.617.657 2.689 4.787 5.545 9.532 4.114 4.78-1.442 6.176-5.383 11.685-20.628.633-1.818-.233-3.78-2.158-4.429"></path>
          </svg>
        </div>

        {/* Tabs */}
        <div className="tabs self-center py-8">
          <a
            className={`tab tab-bordered ${
              currentPage === "search" && "tab-active"
            }`}
            onClick={() => setCurrentPage("search")}
          >
            search
          </a>
          <button
            className={`tab tab-bordered ${
              clinics.length <= 0 && "tab-disabled"
            } ${
              currentPage === "result" && "tab-active"
            }`}
            onClick={() => {if (clinics.length > 0) {setCurrentPage("result")}}}
          >
            results
          </button>
        </div>

        {/* Drawer Content */}
        <div className="overflow-y-auto">
          {currentPage == "search" && (
            <Search
              onSearch={(searchParams) => {
                console.log("Search triggered with the following parameters:");
                console.dir(searchParams);
                searchCriteria = searchParams;
                const searchedClinics = getClinics(searchCriteria);
                if (searchedClinics.length > 0) {
                  setClinics(searchedClinics);
                  setCurrentPage("result");
                  setShowToast(false);
                } else {
                  setShowToast(true);
                }
              }}
            />
          )}
          {currentPage == "result" && (
            <Results
              clinics={clinics}
              onSeeMore={(clinic) => {
                setCurrentPage("clinic");
                setCurrentClinic(clinic);
              }}
            />
          )}
          {currentPage == "clinic" && <Details clinic={currentClinic} />}
        </div>
      </div>

      {/* Credits */}
      <span className="fixed bottom-4 w-screen text-center text-xs text-white mt-6">
        <p>Made for Chewy Diversity Hackathon 2023 by team "PawCare".</p>
      </span>
    </div>
  );
}
