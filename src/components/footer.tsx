const Footer = () => {
  return (
    <footer className="w-full bg-transparent p-6">
      <div className="container mx-auto flex  flex-col items-center gap-4 text-sm text-neutral-500 md:flex-row md:justify-between">
        
        {/* Copyright Notice */}
        <div>
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6">
          <a
            href="#"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Terms of Service
          </a>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;