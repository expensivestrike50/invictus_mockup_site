import { cn } from '@/lib/utils';

/**
 * LogoMark — the four stacked speed bars from the brand mark, redrawn to sit
 * on a square canvas so it scales cleanly next to the wordmark.
 * Uses currentColor so it inherits the surrounding text color.
 */
export const LogoMark = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 180 124"
    fill="currentColor"
    aria-hidden="true"
    className={cn('h-6 w-auto', className)}
  >
    <path d="M22 8H126L164 30H10L22 8Z" />
    <path d="M10 39H146L180 61H0L10 39Z" />
    <path d="M0 70H148L174 92H12L0 70Z" />
    <path d="M24 101H120L146 123H38L24 101Z" />
  </svg>
);

const Logo = ({
  className,
  markClassName,
  wordClassName,
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}) => (
  <span className={cn('inline-flex items-center gap-2.5 text-foreground', className)}>
    <LogoMark className={cn('h-5 w-auto', markClassName)} />
    <span className={cn('font-display text-2xl font-bold leading-none tracking-tight', wordClassName)}>
      Invictus
    </span>
  </span>
);

export default Logo;
