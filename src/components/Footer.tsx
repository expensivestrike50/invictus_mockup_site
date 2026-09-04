import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Logo from '@/components/base/logo';
import xIcon from '@/assets/icons/x-icon.png';
import instagramIcon from '@/assets/icons/instagram-icon.png';
import linkedinIcon from '@/assets/icons/linkedin-icon.png';
import facebookIcon from '@/assets/icons/facebook-icon.png';

const navLinks = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.pricing', href: '/pricing' },
  { key: 'nav.contact', href: '/contact' },
];

const socialLinks = [
  { icon: xIcon, href: 'https://www.x.com/', alt: 'X' },
  { icon: instagramIcon, href: 'https://www.instagram.com/', alt: 'Instagram' },
  { icon: linkedinIcon, href: 'https://www.linkedin.com/', alt: 'LinkedIn' },
  { icon: facebookIcon, href: 'https://www.facebook.com/', alt: 'Facebook' },
];

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="max-w-[100rem] mx-auto px-10 max-md:px-6 max-xs:px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Logo />
            <p className="text-muted-foreground text-base leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                >
                  <img src={social.icon} alt={social.alt} width={18} height={18} className="w-[18px] h-[18px] brightness-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Pages column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-foreground text-sm font-bold uppercase tracking-wider">
              {t('footer.pages')}
            </h3>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="no-underline group"
                >
                  <div className="relative h-6 overflow-hidden">
                    <div className="flex flex-col">
                      <span className="text-foreground text-lg font-semibold leading-6 transition-transform duration-300 group-hover:-translate-y-6">
                        {t(link.key)}
                      </span>
                      <span className="text-foreground text-lg font-semibold leading-6 transition-transform duration-300 group-hover:-translate-y-6">
                        {t(link.key)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA column */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:pl-8 xl:pl-12">
            <h3 className="text-foreground text-sm font-bold uppercase tracking-wider">
              {t('footer.getStarted')}
            </h3>
            <Link
              to="/reports"
              className="inline-flex items-center justify-center w-fit px-6 py-3 rounded-full bg-primary text-primary-foreground text-base font-semibold hover:bg-primary/90 transition-colors no-underline"
            >
              {t('footer.getStarted')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
