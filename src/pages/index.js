import Image from "next/image";
import Select from "react-select";
import { useState } from "react";
import { Search } from "../components/search.js";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Map from "./Map.js";
import { getClinics } from "../utils/get-clinics.js";
import Results from "./Results.js";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("search");
  const [clinics, setClinics] = useState([]);

  let searchCriteria;

  return (
    <div className="min-h-screen">
      <Map clinics={clinics} />
      <div className="absolute top-0 left-0 h-screen min-w-fit max-w-[40vw] bg-white flex flex-col drop-shadow-xl">
        {/* Back Button */}
        <button>
          <ArrowLeftIcon
            className={`h-8 self-start ${
              currentPage == "search" && "invisible"
            }`}
            onClick={() => setCurrentPage("search")}
          />
        </button>

        {/* Tabs */}
        <div className="tabs self-center">
          <a
            className={`tab tab-bordered ${
              currentPage === "search" && "tab-active"
            }`}
            onClick={() => setCurrentPage("search")}
          >
            Search Criteria
          </a>
          <a
            className={`tab tab-bordered ${
              currentPage === "search" && clinics.length == 0 && "tab-disabled"
            } tab-active`}
            onClick={() => setCurrentPage("result")}
          >
            Clinics Found
          </a>
        </div>

        {/* Drawer Content */}
        {currentPage == "search" && (
          <Search
            onSearch={(searchParams) => {
              console.log("Search triggered");
              console.dir(searchParams);
              searchCriteria = searchParams;
              setClinics(getClinics(searchCriteria));
              setCurrentPage("result");
            }}
          />
        )}
        {currentPage == "result" && <Results clinics={clinics} />}
      </div>
    </div>
  );
}
