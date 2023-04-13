import Image from "next/image";
import { Inter } from "next/font/google";
import clinicsData from "../clinic-info.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const clinics = clinicsData.map((c) => c.clinic_name);

  return <>{clinics}</>;
}
