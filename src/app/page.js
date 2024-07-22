import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container-fluid image-bg w-full min-h-screen flex justify-center">
      <div className="flex flex-col w-full max-w-4xl text-white">
        <h1 className="py-8 text-4xl md:text-5xl lg:text-6xl font-bold font-poppins">
          Cryptography
        </h1>
        <p className="text-base md:text-lg lg:text-xl font-poppins">
          In mathematics, cryptography is the study of techniques and methods used to secure communication and protect information from unauthorized access or malicious attacks. It involves the design, analysis, and implementation of mathematical algorithms that ensure confidentiality, integrity, authentication, and non-repudiation of data.
        </p>
        <p className="py-8 text-base md:text-lg lg:text-xl font-poppins">
          Below are the features for <mark>cryptography</mark>:
        </p>
        <ol className="pl-8 list-upper-roman grid gap-3 text-base md:text-lg lg:text-xl">
          <li><Link href="/encrype-decrypt">Caesar Cipher</Link></li>
          <li><Link href="#">RSA</Link></li>
        </ol>
        <div className="w-full flex flex-col justify-center text-base md:text-lg lg:text-xl text-white mt-16 lg:mt-64">
          <h1 className="text-center py-8">
            TEAM MEMBER
          </h1>
          <ol className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-10 pb-8">
            <li>Phan Sovannarith</li>
            <li>YOEURN YAN</li>
            <li>YOUNG SOKHEANG</li>
            <li>RA PHEAROM</li>
            <li>RAN FIDINAN</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
