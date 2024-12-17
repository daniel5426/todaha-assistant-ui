"use client";
import Topbar from "../components/Topbar";
import Package from "../components/Package";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Topbar />
      <Package />
    </div>
  );
}
