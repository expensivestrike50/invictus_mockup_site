import { LogoMark } from '@/components/base/logo';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

const accountLinks = [
  { label: 'Sign In', href: '/signin' },
  { label: 'Sign Up', href: '/signup' },
  { label: 'Reset Password', href: '/reset-password' },
];

const authenticatedLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Clubs', href: '/clubs' },
  { label: 'Reports', href: '/reports' },
];

const prefetchAbout = () => {
  import('@/pages/About');
};
const prefetchPricing = () => {
  import('@/pages/Pricing');
};
const prefetchContact = () => {
  import('@/pages/Contact');
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAnonymous, signOut, isLoading } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAccountSubmenu = () => setIsAccountOpen(!isAccountOpen);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const currentAccountLinks = user ? authenticatedLinks : accountLinks;

  return (
    <nav className="absolute inset-x-0 top-0 z-50 bg-transparent">
      <div className="w-full h-full px-5 md:px-10">
        <div className="w-full max-w-[100rem] h-full mx-auto">
          <div className="flex flex-row justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="relative z-10 flex items-center gap-2 no-underline group">
              <LogoMark className="h-6 w-auto text-foreground max-xs:h-5" />
              <div className="relative h-8 overflow-hidden">
                <div className="flex flex-col">
                  <span className="text-foreground text-[1.675rem] font-bold font-display leading-8 max-xs:text-[1.5rem] transition-transform duration-300 group-hover:-translate-y-8">
                    Invictus
                  </span>
                  <span className="text-foreground text-[1.675rem] font-bold font-display leading-8 max-xs:text-[1.5rem] transition-transform duration-300 group-hover:-translate-y-8">
                    Invictus
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onMouseEnter={
                      link.href === '/about'
                        ? prefetchAbout
                        : link.href === '/pricing'
                        ? prefetchPricing
                        : link.href === '/contact'
                        ? prefetchContact
                        : undefined
                    }
                    className="no-underline group"
                  >
                    <div className="relative h-5 overflow-hidden">
                      <div className="flex flex-col">
                        <span className="text-foreground text-base font-semibold leading-5 transition-transform duration-300 group-hover:-translate-y-5">
                          {link.label}
                        </span>
                        <span className="text-foreground text-base leading-5 transition-transform duration-300 group-hover:-translate-y-5 font-semibold">
                          {link.label}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                {/* Account Dropdown */}
                <div
                  className="relative"
                  onPointerEnter={() => setIsDropdownOpen(true)}
                  onPointerLeave={() => setIsDropdownOpen(false)}
                >
                  <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                      <button className="no-underline flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none">
                        <span className="text-foreground text-base font-semibold leading-5">
                          {user ? (isAnonymous ? 'Demo' : 'Account') : 'Account'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-foreground transition-transform duration-300 ${
                            isDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      sideOffset={2}
                      portalled={false}
                      className="min-w-[160px] rounded-2xl p-3 flex flex-col gap-5"
                    >
                      {currentAccountLinks.map((link) => (
                        <DropdownMenuItem
                          key={link.label}
                          asChild
                          className="p-0 focus:bg-transparent"
                        >
                          <Link to={link.href} className="cursor-pointer w-full no-underline group/item">
                            <div className="relative h-5 overflow-hidden">
                              <div className="flex flex-col">
                                <span className="text-foreground text-base font-semibold leading-5 transition-transform duration-300 group-hover/item:-translate-y-5">
                                  {link.label}
                                </span>
                                <span className="text-foreground text-base leading-5 transition-transform duration-300 group-hover/item:-translate-y-5 font-semibold">
                                  {link.label}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      {user && (
                        <DropdownMenuItem
                          className="p-0 focus:bg-transparent cursor-pointer"
                          onClick={handleSignOut}
                        >
                          <div className="flex items-center gap-2 text-foreground text-base font-semibold">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </div>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Get Started Button */}
              <Button variant="invofy" size="invofy" asChild>
                <Link to={user ? '/dashboard' : '/reports'}>
                  {user ? 'Dashboard' : 'Get Started'}
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden z-10 flex justify-center items-center w-16 h-16 max-lg:w-[3.75rem] max-lg:h-[3.75rem] max-xs:w-[3.75rem] max-xs:h-[3.75rem] bg-primary rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative flex justify-center items-center w-6 h-full">
                <div className="flex flex-col justify-center items-center gap-[6px] w-6 h-4 overflow-hidden">
                  <motion.div
                    className="w-full h-[2px] bg-primary-foreground"
                    animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="w-full h-[2px] bg-primary-foreground"
                    animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -4 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-[5] bg-transparent flex justify-center items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-start gap-8 w-full h-full bg-background pt-48 max-xs:pt-40"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onMouseEnter={
                      link.href === '/about'
                        ? prefetchAbout
                        : link.href === '/pricing'
                        ? prefetchPricing
                        : link.href === '/contact'
                        ? prefetchContact
                        : undefined
                    }
                    onClick={() => setIsMenuOpen(false)}
                    className="no-underline group"
                  >
                    <span className="text-foreground text-5xl max-md:text-[2.5rem] max-xs:text-[2.25rem] font-semibold font-display leading-tight">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Account Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + navLinks.length * 0.05 }}
                className="flex flex-col items-center"
              >
                <button
                  onClick={toggleAccountSubmenu}
                  className="no-underline group flex items-center gap-2 bg-transparent border-none cursor-pointer"
                >
                  <span className="text-foreground text-5xl max-md:text-[2.5rem] max-xs:text-[2.25rem] font-semibold font-display leading-tight">
                    {user ? (isAnonymous ? 'Demo' : 'Account') : 'Account'}
                  </span>
                  <ChevronDown
                    className={`w-8 h-8 max-md:w-6 max-md:h-6 text-foreground transition-transform duration-300 ${
                      isAccountOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isAccountOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center gap-4 mt-4 overflow-hidden"
                    >
                      {currentAccountLinks.map((link, index) => (
                        <motion.div
                          key={link.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Link
                            to={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="no-underline"
                          >
                            <span className="text-foreground/80 text-3xl max-md:text-2xl max-xs:text-xl font-medium font-display leading-tight hover:text-foreground transition-colors">
                              {link.label}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                      {user && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: currentAccountLinks.length * 0.05 }}
                        >
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 text-foreground/80 text-3xl max-md:text-2xl max-xs:text-xl font-medium font-display leading-tight hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
                          >
                            <LogOut className="w-6 h-6 max-md:w-5 max-md:h-5" />
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Mobile Get Started Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + 0.05 }}
              >
                <Button variant="invofy" size="invofy" asChild onClick={() => setIsMenuOpen(false)}>
                  <Link to={user ? '/dashboard' : '/reports'}>
                    {user ? 'Dashboard' : 'Get Started'}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
