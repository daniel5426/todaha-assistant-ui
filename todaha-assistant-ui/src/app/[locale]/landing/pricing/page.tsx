"use client";
import Topbar from "../components/Topbar";
import Package from "../components/Package";

export default function Page() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <Topbar />
      <div className="mx-auto max-w-7xl p-6">
          <Package />
      </div>
    </div>
  );
}
