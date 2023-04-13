import Image from "next/image";
import Select from "react-select";
import { useState } from "react";
import { Search } from "../components/search.js";
import { Clinic } from "../components/clinic.js";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("search");

  return (
    <div className="min-h-screen max-w-[40vw] bg-white flex flex-col p-10 space-y-4 drop-shadow-xl">
      <ArrowLeftIcon
        className={`h-8 self-start ${currentPage == "search" && "invisible"}`}
      />
      <div className="tabs self-center">
        <a className="tab tab-bordered tab-active">Search Criteria</a>
        <a className="tab tab-bordered tab-disabled">Clinics Found</a>
      </div>

      <Search />
    </div>
  );
}
