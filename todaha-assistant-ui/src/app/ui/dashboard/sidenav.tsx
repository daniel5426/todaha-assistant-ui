import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <div className=" h-full px-3 py-4 md:px-2">
      <ul className="menu bg-base-200 w-56 rounded-box h-full ">
        <Link
          className="mb-2 flex h-20 items-end justify-start rounded-md bg-slate-600 p-4 md:h-40"
          href="/"
        >
          <div className="w-32 text-white md:w-40">
            <AcmeLogo />
          </div>
        </Link>
        <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
        </div>
        <div className="space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <li className="">
            <Link href="/">
              Sign Out
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
}
