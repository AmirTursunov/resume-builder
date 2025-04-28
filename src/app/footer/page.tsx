import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-blue-100 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-black">
          &copy; 2025 Resume Builder. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-6 text-black">
          <Link href="/" className="text-sm hover:text-cyan-400">
            About Us
          </Link>
          <Link href="/" className="text-sm hover:text-cyan-400">
            Contact
          </Link>
          <Link href="/" className="text-sm hover:text-cyan-400">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
