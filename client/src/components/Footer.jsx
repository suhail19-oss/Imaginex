import { assets } from "../assets/assets";

function Footer() {
  return (
    <footer className="mt-20 px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img src={assets.logo_icon} alt="Imaginex logo" className="w-8" />
            <span className="text-lg font-semibold text-black">imaginex</span>
          </div>

          <p className="text-sm text-gray-500 sm:border-l sm:border-gray-300 sm:pl-4 text-center sm:text-left">
            © {new Date().getFullYear()} Imaginex.ai. All rights reserved.
          </p>
        </div>

        <div className="flex gap-3">
          <img
            src={assets.facebook_icon}
            alt="Facebook"
            className="w-8 cursor-pointer hover:opacity-80 transition"
          />
          <img
            src={assets.twitter_icon}
            alt="Twitter"
            className="w-8 cursor-pointer hover:opacity-80 transition"
          />
          <img
            src={assets.instagram_icon}
            alt="Instagram"
            className="w-8 cursor-pointer hover:opacity-80 transition"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
