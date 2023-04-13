import Image from "next/image";
import Select from "react-select";
import { useState } from "react";
import { Search } from "../components/search.js";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Map from "./Map.js";
import { getClinics } from "../utils/get-clinics.js";
import Results from "./Results.js";
import { motion } from "framer-motion"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("search");
  const [clinics, setClinics] = useState([]);
  const [showDrawer, setShowDrawer] = useState(true);

  let searchCriteria;

  return (
    <div>
      {/* Map */}
      <div onMouseDown={() => setShowDrawer(false)} onMouseUp={() => setShowDrawer(true)}><Map clinics={clinics} /></div>
      {/* Drawer */}
        <motion.div className="min-h-screen" animate={showDrawer ? {opacity: 1} : {opacity: 0}}>
          <div className={`absolute bg-white top-0 left-0 h-screen w-80 p-6 max-w-[40vw] overflow-scroll 
          flex flex-col`}>
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
              {currentPage == "result" && <Results clinics={clinics} />}
            </div>
          </div>
        </motion.div>
    </div>
  );
}
