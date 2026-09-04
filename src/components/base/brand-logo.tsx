import invictusLogo from '@/assets/invictus-logo.png';
import { cn } from '@/lib/utils';

/**
 * BrandLogo — the Invictus logo mark and wordmark used across the demo app
 * (dashboard, players, reports) headers.
 */
export const BrandLogo = ({ className }: { className?: string }) => (
  <img
    src={invictusLogo}
    alt="Invictus logo"
    width={344}
    height={139}
    className={cn('h-8 w-auto object-contain', className)}
  />
);
