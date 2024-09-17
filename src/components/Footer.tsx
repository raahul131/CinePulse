import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 py-10 px-4 md:px-16">
      <div className="container mx-auto px-4">
        {/* Social Icons */}
        <div className="flex md:justify-center space-x-6 mb-6">
          <a href="#" className="text-gray-400 hover:text-white">
            <FaFacebookF size={25} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaInstagram size={25} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaTwitter size={25} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaYoutube size={25} />
          </a>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-start md:text-left">
          <div className="space-y-3">
            <a href="#" className="hover:underline">
              Audio Description
            </a>
            <a href="#" className="hover:underline block">
              Investor Relations
            </a>
            <a href="#" className="hover:underline block">
              Legal Notices
            </a>
          </div>
          <div className="space-y-3">
            <a href="#" className="hover:underline">
              Help Centre
            </a>
            <a href="#" className="hover:underline block">
              Jobs
            </a>
            <a href="#" className="hover:underline block">
              Cookie Preferences
            </a>
          </div>
          <div className="space-y-3">
            <a href="#" className="hover:underline">
              Gift Cards
            </a>
            <a href="#" className="hover:underline block">
              Terms of Use
            </a>
            <a href="#" className="hover:underline block">
              Corporate Information
            </a>
          </div>
          <div className="space-y-3">
            <a href="#" className="hover:underline">
              Media Centre
            </a>
            <a href="#" className="hover:underline block">
              Privacy
            </a>
            <a href="#" className="hover:underline block">
              Contact Us
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          © {currentYear} CinePulse, Inc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
