import { ChevronLeft, MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="containerWrapper mx-auto py-12 mt-[60px] px-5">
      <Link href="/" className="flex text-slate-600 items-center  my-3">
        <ChevronLeft className="" size={18} />
        <span className="ml-2">Back to home page</span>
      </Link>
      <div className=" pl-10">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          This Privacy Policy explains how VELORA collects, uses, and shares
          information about you when you use our website VELORA.
        </p>

        <h2 className="text-2xl font-semibold mb-3">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We collect various types of information to provide and improve our
          services to you:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>
            Personal Information (e.g., name, email address, phone number)
          </li>
          <li>Usage Data (e.g., browsing actions, device information)</li>
          <li>Cookies and Tracking Technologies</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To provide customer support</li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent, and address technical issues</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">
          3. Sharing Your Information
        </h2>
        <p className="mb-4">
          We may share your personal information in the following situations:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>With service providers to help us provide our services</li>
          <li>To comply with legal obligations</li>
          <li>To protect the rights, property, or safety of us or others</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">4. Cookies</h2>
        <p className="mb-4">
          Cookies are files with small amounts of data that are stored on your
          device. We use cookies to track your activity on our Site and store
          certain information. You can set your browser to refuse cookies, but
          some parts of the Site may not function properly.
        </p>

        <h2 className="text-2xl font-semibold mb-3">
          5. Your Data Protection Rights
        </h2>
        <p className="mb-4">
          You have the right to request access to your personal data, to request
          correction of any inaccurate data, and to request deletion of your
          personal data under certain circumstances.
        </p>

        <h2 className="text-2xl font-semibold mb-3">
          6. Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at:{" "}
          <a href="mailto:muhamedgamal250@gmail" className="text-blue-500">
            muhamedgamal250@gmaill
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
