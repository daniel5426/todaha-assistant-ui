import error404Image from "@/assets/images/landscape/error-404.svg";
import Image from "next/image";
import Link from "next/link";
import "./ui/globals.css";
import PageMetaData from "@/components/PageMetaData";
import routes from "@/services/routes";

const NotFoundPage = () => {
    return (
        <>
            <PageMetaData title={"Not Found - 404"} />

            <div className="flex h-screen w-screen flex-col items-center justify-center">
                <Image src={error404Image} alt="error" className="max-h-[400px]" />
                <Link href={routes.landing} className="btn btn-primary mt-5">
                    Go to Home
                </Link>
            </div>
        </>
    );
};

export default NotFoundPage;
