export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-heading font-bold text-blue-400">BK</h2>
            <p className="text-gray-400 mt-2">GenAI Engineer | Cloud AI Developer</p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
            <a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Home</a>
            <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">About</a>
            <a href="#skills" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Skills</a>
            <a href="#projects" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Projects</a>
            <a href="#experience" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Experience</a>
            <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Contact</a>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Balakarthick V. All rights reserved.
          </p>
          
        <div className="flex space-x-4">
        <a href="https://www.linkedin.com/in/balakarthickv/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://github.com/vbalakarthick" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.naukri.com/mnjuser/profile?id=&altresid" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity duration-200">
          <img src="https://static.naukimg.com/s/0/0/i/naukri-identity/naukri_gnb_logo.svg" alt="Naukri Profile" className="w-12 h-7"/>
        </a>
        {/* <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
          <i className="fab fa-dribbble"></i>
        </a> */}
        </div>
        </div>
      </div>
    </footer>
  );
}
