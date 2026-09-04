import { useRef, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { useInvoice } from '@/hooks/useInvoice';
import { InvoiceForm } from '@/components/invoice/InvoiceForm';
import { InvoicePreview } from '@/components/invoice/InvoicePreview';
import { TemplateSelector } from '@/components/invoice/TemplateSelector';
import { ArrowLeft, Download, FileText, Check, Save, Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SavedClient {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  address: string | null;
}

const InvoiceGenerator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoadingInvoice, setIsLoadingInvoice] = useState(false);
  const [savedClients, setSavedClients] = useState<SavedClient[]>([]);
  const isMobile = useIsMobile();

  const {
    invoiceData,
    template,
    setTemplate,
    templateStyles,
    setTemplateStyles,
    invoiceId,
    isSaving,
    updateBusiness,
    updateClient,
    updateInvoice,
    updateLineItem,
    addLineItem,
    removeLineItem,
    reorderLineItems,
    updateTaxRate,
    updateDiscountRate,
    updatePaymentTerms,
    updateNotes,
    updateStatus,
    setClientFromSaved,
    calculations,
    saveInvoice,
    loadInvoice,
  } = useInvoice();

  // Load invoice if editing existing one
  useEffect(() => {
    if (id && user) {
      setIsLoadingInvoice(true);
      loadInvoice(id).finally(() => setIsLoadingInvoice(false));
    }
  }, [id, user, loadInvoice]);

  // Fetch saved clients
  useEffect(() => {
    if (user) {
      supabase
        .from('clients')
        .select('id, name, company, email, address')
        .eq('user_id', user.id)
        .order('name')
        .then(({ data }) => {
          if (data) setSavedClients(data);
        });
    }
  }, [user]);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${invoiceData.invoice.invoiceNumber || 'invoice'}.pdf`);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    const success = await saveInvoice();
    if (success && !id && invoiceId) {
      // Navigate to the new invoice URL without losing state
      navigate(`/reports/${invoiceId}`, { replace: true });
    }
  };

  if (isLoadingInvoice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className={cn(
          "container flex h-16 items-center justify-between px-4",
          isMobile ? "py-[5px]" : "py-3"
        )}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span className="font-semibold text-sm sm:text-lg">
                {id ? 'Edit Agency Report' : 'New Agency Report'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {showSuccess && (
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <Check className="h-4 w-4" />
                <span className="max-[479px]:hidden">Downloaded!</span>
              </div>
            )}
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isSaving}
              className="max-[479px]:px-3"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save className="h-4 w-4 sm:mr-2" />
                  <span className="max-[479px]:hidden">Save</span>
                </>
              )}
            </Button>
            <Button
              variant="invofy"
              size="invofy"
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="max-[479px]:px-4 max-[479px]:py-2"
            >
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="max-[479px]:hidden">
                {isGenerating ? 'Generating...' : 'Download PDF'}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn(
        "container py-6 px-4",
        isMobile ? "max-w-full" : "max-w-[1600px]"
      )}>
        <div className={cn(
          "grid gap-6",
          isMobile ? "grid-cols-1" : "grid-cols-[1fr_1fr] lg:grid-cols-[minmax(400px,500px)_1fr]"
        )}>
          {/* Left Side - Form */}
          <div className={cn(
            "space-y-6",
            !isMobile && "max-h-[calc(100vh-7rem)] overflow-y-auto pr-2"
          )}>
            <TemplateSelector
              template={template}
              setTemplate={setTemplate}
              templateStyles={templateStyles}
              setTemplateStyles={setTemplateStyles}
            />

            <InvoiceForm
              invoiceData={invoiceData}
              calculations={calculations}
              updateBusiness={updateBusiness}
              updateClient={updateClient}
              updateInvoice={updateInvoice}
              updateLineItem={updateLineItem}
              addLineItem={addLineItem}
              removeLineItem={removeLineItem}
              reorderLineItems={reorderLineItems}
              updateTaxRate={updateTaxRate}
              updateDiscountRate={updateDiscountRate}
              updatePaymentTerms={updatePaymentTerms}
              updateNotes={updateNotes}
              updateStatus={updateStatus}
              setClientFromSaved={setClientFromSaved}
              savedClients={savedClients}
            />
          </div>

          {/* Right Side - Preview */}
          <div className={cn(
            "bg-muted/30 rounded-2xl p-2 sm:p-6",
            !isMobile && "sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto"
          )}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Live Preview</h2>
              <span className="text-sm text-muted-foreground">Updates in real-time</span>
            </div>
            
            <div className="bg-muted/50 rounded-xl p-1 sm:p-4 flex justify-center">
              <InvoicePreview
                ref={previewRef}
                invoiceData={invoiceData}
                template={template}
                templateStyles={templateStyles}
                calculations={calculations}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvoiceGenerator;
