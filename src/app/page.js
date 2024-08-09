import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container-fluid image-bg w-full min-h-screen flex justify-center bg-gray-900">
      <div className="flex flex-col w-full max-w-4xl p-6 mx-auto text-white">
        <h1 className="py-8 text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-center">
          Cryptography
        </h1>
        <p className="text-base md:text-lg lg:text-xl font-poppins mb-8 text-center">
          Cryptography is the science of securing communication and data through the use of mathematical techniques. It involves transforming information into a secure format so that only authorized parties can access or understand it. Cryptography is used to protect sensitive information from unauthorized access, ensuring privacy, integrity, and authentication.
        </p>
        <p className="py-4 text-base md:text-lg lg:text-xl font-poppins text-center">
          Below are the features for <mark>cryptography</mark>:
        </p>
        <div className="flex flex-col md:flex-row md:justify-between gap-6 mt-9">

          <div className="text-center p-6 w-full md:w-72 border border-gray-600 rounded-lg">
            <h2 className="font-bold text-2xl mb-4">Caesar Cipher</h2>
            <p className="text-justify mb-4">
              The Caesar cipher is one of the oldest and simplest encryption techniques in cryptography. Named after Julius Caesar, who reportedly used it to protect his military communications, the Caesar cipher is a type of substitution cipher where each letter in the plaintext is shifted a certain number of places down or up the alphabet.
            </p>
            <Link className="border p-3 inline-block hover:border-blue-500 hover:text-blue-500 rounded" href="/caesarCiper">
              Click ME
            </Link>
          </div>

          <div className="text-center p-6 w-full md:w-72 border border-gray-600 rounded-lg">
            <h2 className="font-bold text-2xl mb-4">RSA</h2>
            <p className="text-justify mb-4">
              RSA is used for secure data transmission, and its main application is in securing sensitive data, particularly in digital communication and digital signatures.
            </p>
            <Link className="border p-3 inline-block hover:border-blue-500 hover:text-blue-500 rounded" href="/encrype-decrypt">
              Click ME
            </Link>
          </div>
        </div>
        <footer className="mt-12">
          <div className="w-full flex flex-col items-center text-base md:text-lg lg:text-xl text-white">
            <h2 className="text-center py-4">
              TEAM MEMBER
            </h2>
            <ol className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-10 pb-8">
              <li>Phan Sovannarith</li>
              <li>YOEURN YAN</li>
              <li>YOUNG SOKHEANG</li>
              <li>RA PHEAROM</li>
              <li>RAN FIDINAN</li>
            </ol>
          </div>
        </footer>
      </div>
    </div>
  );
}
