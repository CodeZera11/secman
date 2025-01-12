import { auth } from "@/auth";
import UserButton from "../common/user-button"

const Navbar = async () => {
  const session = await auth();

  return (
    <section id="navbar" className="fixed w-full z-50">
      <nav className="primary-gradient backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#hero" className="text-white font-bold text-xl">
                Web Toolbox
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {/* {LandingPageSections.map(
                  (section) => (
                    <a
                      key={section}
                      href={`#${section.toLowerCase().replace(/\s+/g, '')}`}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {section}
                    </a>
                  )
                )} */}

                <UserButton user={session?.user} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>
  )
}

export default Navbar