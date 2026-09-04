import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { InvoiceTemplate, TemplateStyles, ACCENT_COLORS, FONT_OPTIONS } from '@/types/invoice';
import { FileText, Sparkles, Zap, Plus } from 'lucide-react';
import { ColorPicker } from './ColorPicker';

interface TemplateSelectorProps {
  template: InvoiceTemplate;
  setTemplate: (template: InvoiceTemplate) => void;
  templateStyles: TemplateStyles;
  setTemplateStyles: (styles: TemplateStyles) => void;
}

const TEMPLATES: { id: InvoiceTemplate; name: string; description: string; icon: React.ReactNode }[] = [
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple', icon: <FileText className="w-5 h-5" /> },
  { id: 'modern', name: 'Modern', description: 'Contemporary style', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'bold', name: 'Bold', description: 'Strong and impactful', icon: <Zap className="w-5 h-5" /> },
];

export function TemplateSelector({
  template,
  setTemplate,
  templateStyles,
  setTemplateStyles,
}: TemplateSelectorProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  
  const isCustomColor = !ACCENT_COLORS.some(c => c.value === templateStyles.accentColor);

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Report Style</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Selection */}
        <div className="space-y-3">
          <Label>Template</Label>
          <div className="grid grid-cols-3 gap-3">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                  template === t.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className={cn(
                  "p-2 rounded-full",
                  template === t.id ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  {t.icon}
                </div>
                <span className="text-sm font-medium">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div className="space-y-3">
          <Label>Accent Color</Label>
          <div className="flex flex-wrap gap-2">
            {ACCENT_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => setTemplateStyles({ ...templateStyles, accentColor: color.value })}
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-all",
                  templateStyles.accentColor === color.value
                    ? "border-foreground scale-110"
                    : "border-transparent hover:scale-105"
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
            
            {/* Custom color picker button */}
            <Popover open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center",
                    isCustomColor
                      ? "border-foreground scale-110"
                      : "border-border hover:border-primary/50 hover:scale-105"
                  )}
                  style={{
                    background: isCustomColor 
                      ? templateStyles.accentColor 
                      : 'conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)'
                  }}
                  title="Custom color"
                >
                  {!isCustomColor && (
                    <Plus className="w-4 h-4 text-white drop-shadow-md" />
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3" align="start">
                <ColorPicker
                  color={templateStyles.accentColor}
                  onChange={(color) => setTemplateStyles({ ...templateStyles, accentColor: color })}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Font Selection */}
        <div className="space-y-3">
          <Label>Font Style</Label>
          <div className="grid grid-cols-2 gap-2">
            {FONT_OPTIONS.map((font) => (
              <button
                key={font.value}
                onClick={() => setTemplateStyles({ ...templateStyles, fontFamily: font.value })}
                className={cn(
                  "px-4 py-2 rounded-lg border-2 text-sm transition-all",
                  templateStyles.fontFamily === font.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
                style={{ fontFamily: font.value }}
              >
                {font.name}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
