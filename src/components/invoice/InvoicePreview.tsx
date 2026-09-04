import { forwardRef } from 'react';
import { InvoiceData, InvoiceTemplate, TemplateStyles, CURRENCIES } from '@/types/invoice';
import { cn } from '@/lib/utils';

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
  template: InvoiceTemplate;
  templateStyles: TemplateStyles;
  calculations: {
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    total: number;
  };
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ invoiceData, template, templateStyles, calculations }, ref) => {
    const getCurrencySymbol = (code: string) => {
      return CURRENCIES.find(c => c.code === code)?.symbol || '$';
    };

    const currencySymbol = getCurrencySymbol(invoiceData.invoice.currency);

    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const baseStyles = {
      fontFamily: templateStyles.fontFamily,
    };

    const accentColor = templateStyles.accentColor;

    // Template-specific styles
    const getTemplateClasses = () => {
      switch (template) {
        case 'modern':
          return {
            container: 'bg-white rounded-lg overflow-hidden',
            header: 'p-8 pb-6',
            headerBg: { backgroundColor: accentColor },
            headerText: 'text-white',
            body: 'p-8 pt-6',
            tableHeader: 'border-b-2',
            tableHeaderBg: { borderColor: accentColor },
            tableHeaderText: { color: accentColor },
            totalsSection: 'rounded-lg p-4',
            totalsBg: { backgroundColor: `${accentColor}10` },
          };
        case 'bold':
          return {
            container: 'bg-white',
            header: 'p-8 border-b-4',
            headerBorder: { borderColor: accentColor },
            headerText: '',
            body: 'p-8',
            tableHeader: 'border-b-4',
            tableHeaderBg: { borderColor: accentColor, backgroundColor: `${accentColor}10` },
            tableHeaderText: { color: accentColor },
            totalsSection: 'border-t-4 pt-4',
            totalsBorder: { borderColor: accentColor },
          };
        default: // minimal
          return {
            container: 'bg-white',
            header: 'p-8 pb-6 border-b border-gray-200',
            headerText: '',
            body: 'p-8 pt-6',
            tableHeader: 'border-b border-gray-300',
            tableHeaderText: { color: accentColor },
            totalsSection: 'border-t border-gray-200 pt-4',
          };
      }
    };

    const templateClasses = getTemplateClasses();

    return (
      <div
        ref={ref}
        className={cn("invoice-preview w-full max-w-[210mm] mx-auto shadow-lg", templateClasses.container)}
        style={baseStyles}
      >
        {/* Header */}
        <div
          className={templateClasses.header}
          style={{
            ...templateClasses.headerBg,
            ...templateClasses.headerBorder,
          }}
        >
          <div className="flex justify-between items-start gap-6">
            {/* Business Info */}
            <div className={cn("flex-1", templateClasses.headerText)}>
              {invoiceData.business.logo && (
                <img
                  src={invoiceData.business.logo}
                  alt="Agency logo"
                  className="h-12 w-auto object-contain mb-4"
                />
              )}
              <h2 className={cn(
                "text-xl font-bold mb-2",
                template === 'modern' ? 'text-white' : ''
              )} style={template !== 'modern' ? { color: accentColor } : {}}>
                {invoiceData.business.name || 'Your Agency Name'}
              </h2>
              {invoiceData.business.address && (
                <p className={cn("text-sm", template === 'modern' ? 'text-white/80' : 'text-gray-600')}>
                  {invoiceData.business.address}
                </p>
              )}
              {invoiceData.business.email && (
                <p className={cn("text-sm", template === 'modern' ? 'text-white/80' : 'text-gray-600')}>
                  {invoiceData.business.email}
                </p>
              )}
              {invoiceData.business.phone && (
                <p className={cn("text-sm", template === 'modern' ? 'text-white/80' : 'text-gray-600')}>
                  {invoiceData.business.phone}
                </p>
              )}
            </div>

            {/* Invoice Info */}
            <div className={cn("text-right", templateClasses.headerText)}>
              <h1 className={cn(
                "text-3xl font-bold mb-4",
                template === 'modern' ? 'text-white' : ''
              )} style={template !== 'modern' ? { color: accentColor } : {}}>
                AGENCY REPORT
              </h1>
              <div className={cn("text-sm space-y-1", template === 'modern' ? 'text-white/80' : 'text-gray-600')}>
                <p><span className="font-medium">Report #:</span> {invoiceData.invoice.invoiceNumber}</p>
                <p><span className="font-medium">Issue Date:</span> {formatDate(invoiceData.invoice.issueDate)}</p>
                <p><span className="font-medium">Deadline:</span> {formatDate(invoiceData.invoice.dueDate)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className={templateClasses.body}>
          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: accentColor }}>
              Prepared For
            </h3>
            <div className="text-gray-800">
              <p className="font-medium">{invoiceData.client.name || 'Club Contact'}</p>
              {invoiceData.client.company && <p className="text-sm text-gray-600">{invoiceData.client.company}</p>}
              {invoiceData.client.address && <p className="text-sm text-gray-600">{invoiceData.client.address}</p>}
              {invoiceData.client.email && <p className="text-sm text-gray-600">{invoiceData.client.email}</p>}
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full mb-8">
            <thead>
              <tr
                className={templateClasses.tableHeader}
                style={{
                  ...templateClasses.tableHeaderBg,
                }}
              >
                <th className="text-left py-3 px-2 text-sm font-semibold" style={templateClasses.tableHeaderText}>Description</th>
                <th className="text-center py-3 px-2 text-sm font-semibold w-20" style={templateClasses.tableHeaderText}>Qty</th>
                <th className="text-right py-3 px-2 text-sm font-semibold w-24" style={templateClasses.tableHeaderText}>Rate</th>
                <th className="text-right py-3 px-2 text-sm font-semibold w-24" style={templateClasses.tableHeaderText}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.lineItems.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3 px-2 text-sm text-gray-800">
                    {item.description || 'Item description'}
                  </td>
                  <td className="py-3 px-2 text-sm text-center text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-2 text-sm text-right text-gray-600">
                    {currencySymbol}{item.rate.toFixed(2)}
                  </td>
                  <td className="py-3 px-2 text-sm text-right font-medium text-gray-800">
                    {currencySymbol}{(item.quantity * item.rate).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div
              className={cn("w-64", templateClasses.totalsSection)}
              style={{
                ...templateClasses.totalsBg,
                ...templateClasses.totalsBorder,
              }}
            >
              <div className="flex justify-between py-1 text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{currencySymbol}{calculations.subtotal.toFixed(2)}</span>
              </div>
              {invoiceData.discountRate > 0 && (
                <div className="flex justify-between py-1 text-sm">
                  <span className="text-gray-600">Discount ({invoiceData.discountRate}%)</span>
                  <span className="font-medium text-red-600">-{currencySymbol}{calculations.discountAmount.toFixed(2)}</span>
                </div>
              )}
              {invoiceData.taxRate > 0 && (
                <div className="flex justify-between py-1 text-sm">
                  <span className="text-gray-600">Tax ({invoiceData.taxRate}%)</span>
                  <span className="font-medium">{currencySymbol}{calculations.taxAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
                <span className="font-bold" style={{ color: accentColor }}>Total</span>
                <span className="font-bold text-lg" style={{ color: accentColor }}>
                  {currencySymbol}{calculations.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Terms & Notes */}
          {(invoiceData.paymentTerms || invoiceData.notes) && (
            <div className="border-t border-gray-200 pt-6 space-y-4">
              {invoiceData.paymentTerms && (
                <div>
                  <h4 className="text-sm font-semibold mb-1" style={{ color: accentColor }}>Deal Terms</h4>
                  <p className="text-sm text-gray-600">{invoiceData.paymentTerms}</p>
                </div>
              )}
              {invoiceData.notes && (
                <div>
                  <h4 className="text-sm font-semibold mb-1" style={{ color: accentColor }}>Scouting Notes</h4>
                  <p className="text-sm text-gray-600">{invoiceData.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

InvoicePreview.displayName = 'InvoicePreview';
