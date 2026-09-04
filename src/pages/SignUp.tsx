import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { SocialAuthButtons } from '@/components/base/social-auth-buttons';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import signinBg from '@/assets/auth/signin-bg.jpg';
import xIcon from '@/assets/icons/x-icon.png';
import instagramIcon from '@/assets/icons/instagram-icon.png';
import linkedinIcon from '@/assets/icons/linkedin-icon.png';
import facebookIcon from '@/assets/icons/facebook-icon.png';

const LogoIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-6 h-6 text-foreground"
  >
    <path d="M18.5293 15.3193C18.7059 14.8935 19.2943 14.8935 19.4707 15.3193L19.7236 15.9307C20.1556 16.9735 20.9615 17.8062 21.9746 18.2568L22.6924 18.5762C23.1026 18.759 23.1026 19.3562 22.6924 19.5391L21.9326 19.877C20.9449 20.3162 20.1534 21.1194 19.7139 22.1279L19.4668 22.6934C19.2864 23.1075 18.7137 23.1075 18.5332 22.6934L18.2871 22.1279C17.8476 21.1193 17.0552 20.3163 16.0674 19.877L15.3076 19.5391C14.8974 19.3562 14.8974 18.759 15.3076 18.5762L16.0254 18.2568C17.0385 17.8062 17.8445 16.9735 18.2764 15.9307L18.5293 15.3193ZM20.002 2C20.5532 2.00012 21 2.45576 21 2.99219V13.3418C20.3744 13.1207 19.7013 13 19 13C15.6863 13 13 15.6863 13 19C13 20.0932 13.2939 21.1173 13.8047 22H3.99316C3.44463 21.9999 3 21.5507 3 20.9922V9H9C9.55228 9 10 8.55228 10 8V2H20.002ZM8 7H3L8 2.00293V7Z"></path>
  </svg>
);

const socialLinks = [
  { icon: xIcon, href: 'https://www.x.com/', alt: 'X' },
  { icon: instagramIcon, href: 'https://www.instagram.com/', alt: 'Instagram' },
  { icon: linkedinIcon, href: 'https://www.linkedin.com/', alt: 'LinkedIn' },
  { icon: facebookIcon, href: 'https://www.facebook.com/', alt: 'Facebook' },
];

const SocialIcon = ({ icon, href, alt }: { icon: string; href: string; alt: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex items-center justify-center w-10 h-10 bg-foreground rounded-full transition-transform duration-300 hover:scale-110"
  >
    <div className="relative w-4 h-4 overflow-hidden">
      <div className="flex flex-col items-center w-full transition-transform duration-300 group-hover:-translate-y-4">
        <img src={icon} alt={alt} className="w-4 h-4" />
        <img src={icon} alt={alt} className="w-4 h-4" />
      </div>
    </div>
  </a>
);

const signUpSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters"),
  confirmPassword: z.string()
    .min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp, signInAnonymously, user, isLoading: authLoading } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  // Redirect if already logged in (but allow anonymous users to upgrade)
  useEffect(() => {
    if (user && !authLoading && !user.is_anonymous) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = signUpSchema.safeParse({ name, email, password, confirmPassword });
    
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof fieldErrors;
        if (field) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await signUp(email, password, name);
    
    if (error) {
      let message = error.message;
      if (message.includes('already registered')) {
        message = 'An account with this email already exists. Please sign in instead.';
      }
      toast({
        variant: 'destructive',
        title: "Sign up failed",
        description: message,
      });
      setIsSubmitting(false);
      return;
    }
    
    toast({
      title: "Account created!",
      description: "Please check your email to verify your account.",
    });
    
    setIsSubmitting(false);
  };

  const handleDemoMode = async () => {
    setIsDemoLoading(true);
    
    const { error } = await signInAnonymously();
    
    if (error) {
      toast({
        variant: 'destructive',
        title: "Demo mode failed",
        description: error.message,
      });
      setIsDemoLoading(false);
      return;
    }
    
    toast({
      title: "Welcome to Demo Mode!",
      description: "Explore Invofy with sample data.",
    });
    
    navigate('/dashboard');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with centered logo */}
      <header className="pt-8 max-[479px]:pt-6 flex justify-center">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <LogoIcon />
          <span className="text-foreground text-[1.675rem] max-[479px]:text-[1.5rem] font-bold font-display leading-[1.2]">
            Invofy
          </span>
        </Link>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-5 md:px-10 py-8">
        {/* Outer container with background */}
       <div className="w-full max-w-[1440px] rounded-[48px] md:rounded-[64px] overflow-hidden">
          {/* Background image container */}
          <div 
           className="w-full p-6 sm:p-10 md:p-20 lg:p-24 bg-cover bg-center"
            style={{ backgroundImage: `url(${signinBg})` }}
          >
            {/* White form card */}
           <div className="bg-card rounded-[30px] p-6 sm:p-8 md:p-10 lg:p-12 w-full max-w-[450px] md:max-w-[500px] lg:max-w-[560px] mx-auto shadow-xl">
              {/* Heading */}
              <div className="text-center mb-6">
                <h1 className="text-foreground text-2xl sm:text-3xl font-bold font-display mb-2">
                  Create an account
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Get started with Invofy today
                </p>
              </div>
              
              {/* SSO — the ONE shared, brand-compliant button set. Never hand-roll
                  these; see docs/design/auth.md. */}
              <SocialAuthButtons mode="signup" providers={['google']} className="mb-6" />

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-muted-foreground text-sm">Or sign up with</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`h-14 rounded-full border-border bg-background px-6 ${errors.name ? 'border-destructive' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`h-14 rounded-full border-border bg-background px-6 ${errors.email ? 'border-destructive' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`h-14 rounded-full border-border bg-background px-6 ${errors.password ? 'border-destructive' : ''}`}
                  />
                  {errors.password && (
                    <p className="text-destructive text-sm">{errors.password}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`h-14 rounded-full border-border bg-background px-6 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-destructive text-sm">{errors.confirmPassword}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  variant="invofy"
                  size="invofy"
                  className="w-full"
                  disabled={isSubmitting || isDemoLoading}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </form>

              {/* Demo Mode Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-muted-foreground text-sm">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Demo Mode Button */}
              <Button
                type="button"
                variant="invofyOutline"
                size="invofy"
                className="w-full"
                onClick={handleDemoMode}
                disabled={isSubmitting || isDemoLoading}
              >
                {isDemoLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Starting Demo...
                  </>
                ) : (
                  'Try Demo Mode'
                )}
              </Button>
              <p className="text-center text-muted-foreground text-xs mt-2">
                No account required — explore with sample data
              </p>
              
              {/* Links */}
              <div className="text-center mt-6 text-sm">
                <span className="text-muted-foreground">
                  Already have an account?{' '}
                </span>
                <Link 
                  to="/signin" 
                  className="text-primary font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Simplified footer */}
      <footer className="px-5 md:px-10 py-6">
       <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <LogoIcon />
            <span className="text-foreground text-xl max-[479px]:text-lg font-bold font-display leading-[1.2]">
              Invofy
            </span>
          </Link>
          
          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <SocialIcon key={social.alt} {...social} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
