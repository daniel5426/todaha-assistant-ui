"use client";
import { useLocale } from "next-intl";

export default function Page() {
    const locale = useLocale();
    const isRTL = locale === "he";
  
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl text-black">
                <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
                <p className="mb-4">
                    At Todaha, we respect your privacy and are committed to protecting your personal data.
                </p>
                <p className="mb-4">
                    This policy explains how we collect, use, and protect your information when you use our software.
                </p>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="mb-4">
                    We may collect personal data that you provide to us, such as your name, email address, and payment information.
                </p>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="mb-4">
                    We use your information to provide and improve our software, process transactions, and communicate with you.
                </p>
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="mb-4">
                    We implement reasonable measures to protect your data from unauthorized access and ensure its confidentiality.
                </p>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about this privacy policy, please contact us at <a href="mailto:todaha26@gmail.com" className="text-blue-500">todaha26@gmail.com</a>.
                </p>
            </div>
        </div>
    );
}
