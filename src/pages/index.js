import Image from "next/image";
import Select from "react-select";
import { useState } from "react";
import { Search } from "../components/search.js";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Map from "./Map.js";
import { getClinics } from "../utils/get-clinics.js";
import Results from "./Results.js";
import { motion } from "framer-motion"
import {Details} from "../components/details.js"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("search"); // search, result, clinic
  const [currentClinic, setCurrentClinic] = useState(); // search, result, clinic
  const [clinics, setClinics] = useState([]);

  let searchCriteria;

  const backButton = () => {
    switch (currentPage) {
      case "result":
        setCurrentPage("search")
        return;
      case "clinic":
        setCurrentPage("result")
        return;
      default:
        return;
    }
  }

  return (
    <div>
      {/* Map */}
      <Map clinics={clinics} />
      {/* Drawer */}
      <div className="min-h-screen">
        <div
          className={`absolute bg-neutral top-0 left-0 h-screen w-80 p-6 max-w-[40vw] overflow-scroll 
        flex flex-col`}
        >
          {/* Back Button */}
          <button className="max-w-fit">
            <ArrowLeftIcon
              className={`h-8 self-start ${
                currentPage == "search" && "invisible"
              }`}
              onClick={() => {
                backButton()
              }} 
            />
          </button>

          {/* Tabs */}
          <div className="tabs self-center py-8">
            <a
              className={`tab tab-bordered ${
                currentPage === "search" && "tab-active"
              }`}
              onClick={() => setCurrentPage("search")}
            >
              Search
            </a>
            <a
              className={`tab tab-bordered ${
                currentPage === "result" && "tab-active"
              }`}
              onClick={() => setCurrentPage("result")}
            >
              Results
            </a>
          </div>

          {/* Drawer Content */}
          <div>
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
            {currentPage == "result" && <Results clinics={clinics} onSeeMore={clinic => {setCurrentPage("clinic"); setCurrentClinic(clinic)}}/>}
            {currentPage == "clinic" && <Details clinic={currentClinic}/>}
          </div>
        </div>
      </div>
    </div>
  );
}
