import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import contactHeaderBg from '@/assets/contact/contact-header-bg.jpg';
import contactImage01 from '@/assets/contact/contact-image-01.jpg';
import contactImage02 from '@/assets/contact/contact-image-02.jpg';
import xIcon from '@/assets/icons/x-icon.png';
import instagramIcon from '@/assets/icons/instagram-icon.png';
import linkedinIcon from '@/assets/icons/linkedin-icon.png';
import facebookIcon from '@/assets/icons/facebook-icon.png';

interface ContactHeaderProps extends React.ComponentProps<'section'> {}

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().optional(),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  { icon: facebookIcon, href: 'https://www.facebook.com/', alt: 'Facebook' },
  { icon: xIcon, href: 'https://www.x.com/', alt: 'X' },
  { icon: instagramIcon, href: 'https://www.instagram.com/', alt: 'Instagram' },
  { icon: linkedinIcon, href: 'https://www.linkedin.com/', alt: 'LinkedIn' },
];


// Social icon with scale animation
const SocialIcon = ({ icon, href, alt }: { icon: string; href: string; alt: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex items-center justify-center w-11 h-11 bg-foreground rounded-full transition-transform duration-300 hover:scale-110"
  >
    <div className="relative w-5 h-5 overflow-hidden">
      <div className="flex flex-col items-center w-full transition-transform duration-300 group-hover:-translate-y-5">
        <img src={icon} alt={alt} width={20} height={20} loading="lazy" decoding="async" className="w-5 h-5" />
        <img src={icon} alt={alt} width={20} height={20} loading="lazy" decoding="async" className="w-5 h-5" />
      </div>
    </div>
  </a>
);


const ContactHeader = ({ className, ...props }: ContactHeaderProps) => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { stiffness: 150, damping: 25, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Movement for left image
  const leftX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const leftY = useTransform(smoothY, [-1, 1], [-12, 12]);

  // Movement for right image (inverted X for opposite direction)
  const rightX = useTransform(smoothX, [-1, 1], [18, -18]);
  const rightY = useTransform(smoothY, [-1, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize to -1 to 1 range
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative min-h-[120vh] max-[991px]:min-h-fit',
        className
      )} 
      {...props}
    >
      {/* Background - covers top 60% */}
      <div 
        className="absolute top-0 left-0 right-0 h-[60%] max-[991px]:h-[50%] bg-cover bg-center bg-no-repeat rounded-b-[4rem] max-[767px]:rounded-b-[48px]"
        style={{ backgroundImage: `url(${contactHeaderBg})` }}
      />
      
      {/* Positioned Images - Desktop Only */}
      <div className="max-[991px]:hidden">
        {/* Left Image - Woman in yellow sweater */}
        <motion.div 
          className="absolute left-[5%] top-[18%] w-[12rem] min-[1440px]:w-[14rem] min-[1920px]:w-[16rem] z-20"
          style={{ x: leftX, y: leftY }}
        >
          <div className="relative overflow-hidden rounded-3xl aspect-square">
            <img 
              src={contactImage01}
              alt="Contact person"
              width={256}
              height={256}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        
        {/* Right Image - Man in blue polo */}
        <motion.div 
          className="absolute right-[5%] top-[16%] w-[12rem] min-[1440px]:w-[14rem] min-[1920px]:w-[16rem] z-20"
          style={{ x: rightX, y: rightY }}
        >
          <div className="relative overflow-hidden rounded-3xl aspect-square">
            <img 
              src={contactImage02}
              alt="Contact person"
              width={256}
              height={256}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-10 max-[767px]:px-6 max-[479px]:px-5">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Text Content */}
          <div className="flex flex-col items-center text-center pt-48 max-[991px]:pt-40 max-[767px]:pt-36 max-[479px]:pt-32 pb-16 max-[767px]:pb-12 max-[479px]:pb-10">
            {/* Label */}
            <span className="text-foreground text-xs tracking-[1px] uppercase font-semibold mb-4">
              Get in Touch
            </span>
            
            {/* Heading */}
            <h1 className="text-foreground text-[4.5rem] max-[991px]:text-[3rem] max-[767px]:text-[2.5rem] max-[479px]:text-[2rem] font-bold font-display leading-[1.2] mb-4 max-w-[48rem]">
              Talk to Our Team
            </h1>
            
            {/* Description */}
            <p className="text-muted-foreground text-lg max-[479px]:text-base leading-[1.4] font-normal max-w-[40rem]">
              Whether you are an agent, a sporting director, or a club, send us a message and we will get back to you as soon as possible.
            </p>
            
            {/* Mobile/Tablet Images - centered above form */}
            <div className="hidden max-[991px]:flex justify-center gap-4 mt-8">
              <div className="w-28 h-28 max-[479px]:w-24 max-[479px]:h-24 rounded-2xl overflow-hidden">
                <img 
                  src={contactImage01}
                  alt="Contact person"
                  width={112}
                  height={112}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-28 h-28 max-[479px]:w-24 max-[479px]:h-24 rounded-2xl overflow-hidden">
                <img 
                  src={contactImage02}
                  alt="Contact person"
                  width={112}
                  height={112}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Contact Form Card */}
          <div className="pb-32 max-[991px]:pb-24 max-[767px]:pb-20 max-[479px]:pb-16">
            <div className="bg-background rounded-[30px] border border-border shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-12 max-[991px]:p-10 max-[767px]:p-8 max-[479px]:p-6 max-w-[720px] mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Row 1: Full name & Email */}
                <div className="grid grid-cols-2 gap-4 max-[767px]:grid-cols-1">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground px-1">
                      Full name
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={cn(
                        "h-14 rounded-full border-border bg-white px-6 text-base placeholder:text-gray-400 focus-visible:ring-primary",
                        errors.fullName && "border-destructive"
                      )}
                    />
                    {errors.fullName && (
                      <span className="text-destructive text-sm px-6">{errors.fullName}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground px-1">
                      Email address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      className={cn(
                        "h-14 rounded-full border-border bg-white px-6 text-base placeholder:text-gray-400 focus-visible:ring-primary",
                        errors.email && "border-destructive"
                      )}
                    />
                    {errors.email && (
                      <span className="text-destructive text-sm px-6">{errors.email}</span>
                    )}
                  </div>
                </div>
                
                {/* Row 2: Phone & Subject */}
                <div className="grid grid-cols-2 gap-4 max-[767px]:grid-cols-1">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground px-1">
                      Phone number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-14 rounded-full border-border bg-white px-6 text-base placeholder:text-gray-400 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground px-1">
                      Subject
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      placeholder="Enter the subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={cn(
                        "h-14 rounded-full border-border bg-white px-6 text-base placeholder:text-gray-400 focus-visible:ring-primary",
                        errors.subject && "border-destructive"
                      )}
                    />
                    {errors.subject && (
                      <span className="text-destructive text-sm px-6">{errors.subject}</span>
                    )}
                  </div>
                </div>
                
                {/* Row 3: Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground px-1">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={cn(
                      "rounded-[1.5rem] border-border bg-white px-6 py-4 text-base placeholder:text-gray-400 focus-visible:ring-primary resize-none",
                      errors.message && "border-destructive"
                    )}
                  />
                  {errors.message && (
                    <span className="text-destructive text-sm px-6">{errors.message}</span>
                  )}
                </div>
                
                {/* Row 4: Button & Social Icons */}
                <div className="flex items-center justify-between gap-4 pt-2 max-[479px]:flex-col max-[479px]:items-stretch">
                  <Button 
                    type="submit" 
                    variant="invofy" 
                    size="invofy"
                    disabled={isSubmitting}
                    className="max-[479px]:w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </Button>
                  
                  <div className="flex items-center gap-3 max-[479px]:justify-center">
                    {socialLinks.map((social) => (
                      <SocialIcon key={social.alt} {...social} />
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHeader;
