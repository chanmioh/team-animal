import Image from "next/image";
import Select from "react-select";
import { useState } from "react";
import { Search } from "../components/search.js";
import { Clinic } from "../components/clinic.js";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Map from "./Map.js";
import { getClinics } from "../utils/get-clinics.js";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("search");
  const [clinics, setClinics] = useState();

  let searchCriteria;

  return (
    <div className="min-h-screen">
      <Map clinics={clinics} />
      <div
        div
        className="absolute h-screen top-0 left-0 max-w-[40vw] bg-white flex flex-col p-10 space-y-4 drop-shadow-xl"
      >
        <ArrowLeftIcon
          className={`h-8 self-start ${currentPage == "search" && "invisible"}`}
          onClick={() => setCurrentPage("search")}
        />
        <div className="tabs self-center">
          <a
            className="tab tab-bordered tab-active"
            onClick={() => setCurrentPage("search")}
          >
            Search Criteria
          </a>
          <a className="tab tab-bordered tab-disabled">Clinics Found</a>
        </div>

        {currentPage == "search" && (
          <Search
            onSearch={(searchParams) => {
              console.log("Search triggered");
              console.dir(searchParams);
              searchCriteria = searchParams;
              setClinics(getClinics(searchParams));
              setCurrentPage("result");
            }}
          >
            <div className="tabs self-center">
              <a className="tab tab-bordered tab-active">Search Criteria</a>
              <a className="tab tab-bordered tab-disabled">Clinics Found</a>
            </div>
          </Search>
        )}
      </div>
    </div>
  );
}
