import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { languages } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  triggerClassName?: string;
}

export const LanguageSwitcher = ({ className, triggerClassName }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const current = languages.find((l) => l.code === i18n.resolvedLanguage) ?? languages[0];

  return (
    <div className={cn('relative', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Select language"
            className={cn(
              'flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-foreground text-base font-semibold leading-5',
              triggerClassName
            )}
          >
            <Globe className="w-4 h-4" />
            <span>{current.label}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8} className="min-w-[160px] rounded-2xl p-2 flex flex-col gap-1">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={cn(
                'cursor-pointer rounded-xl px-3 py-2 text-base font-medium',
                lang.code === current.code && 'bg-accent font-semibold'
              )}
            >
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;
