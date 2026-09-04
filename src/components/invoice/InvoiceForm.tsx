import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, GripVertical, Upload, X, UserPlus } from 'lucide-react';
import { InvoiceData, LineItem, CURRENCIES, INVOICE_STATUSES, InvoiceStatus } from '@/types/invoice';

interface SavedClient {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  address: string | null;
}

interface InvoiceFormProps {
  invoiceData: InvoiceData;
  calculations: {
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    total: number;
  };
  updateBusiness: (field: keyof InvoiceData['business'], value: string | null) => void;
  updateClient: (field: keyof InvoiceData['client'], value: string) => void;
  updateInvoice: (field: keyof InvoiceData['invoice'], value: string) => void;
  updateLineItem: (id: string, field: keyof LineItem, value: string | number) => void;
  addLineItem: () => void;
  removeLineItem: (id: string) => void;
  reorderLineItems: (fromIndex: number, toIndex: number) => void;
  updateTaxRate: (rate: number) => void;
  updateDiscountRate: (rate: number) => void;
  updatePaymentTerms: (terms: string) => void;
  updateNotes: (notes: string) => void;
  updateStatus: (status: InvoiceStatus) => void;
  setClientFromSaved: (client: SavedClient) => void;
  savedClients: SavedClient[];
}

export function InvoiceForm({
  invoiceData,
  calculations,
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
  savedClients,
}: InvoiceFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      reorderLineItems(draggedIndex, toIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate MIME type — reject SVG (can carry scripts) and non-image files
    const ALLOWED = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
    if (!ALLOWED.includes(file.type)) {
      alert('Please upload a PNG, JPEG, WEBP, or GIF image.');
      e.target.value = '';
      return;
    }

    // Validate size — max 500KB (stored inline as data URL in DB)
    const MAX_BYTES = 500 * 1024;
    if (file.size > MAX_BYTES) {
      alert('Logo must be smaller than 500 KB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      updateBusiness('logo', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const getCurrencySymbol = (code: string) => {
    return CURRENCIES.find(c => c.code === code)?.symbol || '$';
  };

  return (
    <div className="space-y-6">
      {/* Business Details */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Your Agency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Logo Upload */}
          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="flex items-center gap-4">
              {invoiceData.business.logo ? (
                <div className="relative w-20 h-20 border border-border rounded-lg overflow-hidden">
                  <img
                    src={invoiceData.business.logo}
                    alt="Business logo"
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => updateBusiness('logo', null)}
                    className="absolute top-1 right-1 p-1 bg-background/80 rounded-full hover:bg-background"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-20 h-20 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors"
                >
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Upload</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business-name">Agency Name</Label>
              <Input
                id="business-name"
                placeholder="Invictus Sports Agency"
                value={invoiceData.business.name}
                onChange={(e) => updateBusiness('name', e.target.value)}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-email">Email</Label>
              <Input
                id="business-email"
                type="email"
                placeholder="agent@invictus.agency"
                value={invoiceData.business.email}
                onChange={(e) => updateBusiness('email', e.target.value)}
                maxLength={255}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business-phone">Phone</Label>
              <Input
                id="business-phone"
                placeholder="+1 (555) 000-0000"
                value={invoiceData.business.phone}
                onChange={(e) => updateBusiness('phone', e.target.value)}
                maxLength={30}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-address">Address</Label>
              <Input
                id="business-address"
                placeholder="Cleveland, Ohio"
                value={invoiceData.business.address}
                onChange={(e) => updateBusiness('address', e.target.value)}
                maxLength={255}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Details */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Club & Sporting Director</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Saved Client Selector */}
          {savedClients.length > 0 && (
            <div className="space-y-2">
              <Label>Select Saved Club</Label>
              <Select
                value={invoiceData.clientId || ''}
                onValueChange={(value) => {
                  if (value === 'new') {
                    updateClient('name', '');
                    updateClient('company', '');
                    updateClient('email', '');
                    updateClient('address', '');
                  } else {
                    const client = savedClients.find((c) => c.id === value);
                    if (client) setClientFromSaved(client);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a saved club or enter new" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">
                    <span className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Enter New Client
                    </span>
                  </SelectItem>
                  {savedClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} {client.company && `(${client.company})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-name">Contact Name</Label>
              <Input
                id="client-name"
                placeholder="Sporting director name"
                value={invoiceData.client.name}
                onChange={(e) => updateClient('name', e.target.value)}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-company">Club</Label>
              <Input
                id="client-company"
                placeholder="Club name"
                value={invoiceData.client.company}
                onChange={(e) => updateClient('company', e.target.value)}
                maxLength={100}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-email">Email</Label>
              <Input
                id="client-email"
                type="email"
                placeholder="director@club.com"
                value={invoiceData.client.email}
                onChange={(e) => updateClient('email', e.target.value)}
                maxLength={255}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-address">Address</Label>
              <Input
                id="client-address"
                placeholder="Club address"
                value={invoiceData.client.address}
                onChange={(e) => updateClient('address', e.target.value)}
                maxLength={255}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Report Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoice-number">Report Number</Label>
              <Input
                id="invoice-number"
                placeholder="REP-001"
                value={invoiceData.invoice.invoiceNumber}
                onChange={(e) => updateInvoice('invoiceNumber', e.target.value)}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={invoiceData.status}
                onValueChange={(value) => updateStatus(value as InvoiceStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {INVOICE_STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={invoiceData.invoice.currency}
                onValueChange={(value) => updateInvoice('currency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issue-date">Issue Date</Label>
              <Input
                id="issue-date"
                type="date"
                value={invoiceData.invoice.issueDate}
                onChange={(e) => updateInvoice('issueDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="due-date">Deadline</Label>
              <Input
                id="due-date"
                type="date"
                value={invoiceData.invoice.dueDate}
                onChange={(e) => updateInvoice('dueDate', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Deal Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-[1fr_80px_100px_100px_40px] gap-2 text-sm font-medium text-muted-foreground px-2">
            <span>Description</span>
            <span>Qty</span>
            <span>Rate</span>
            <span>Amount</span>
            <span></span>
          </div>

          {/* Items */}
          {invoiceData.lineItems.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`grid grid-cols-1 sm:grid-cols-[1fr_80px_100px_100px_40px] gap-2 items-center p-2 bg-muted/30 rounded-lg transition-all ${
                draggedIndex === index ? 'opacity-50' : ''
              } ${dragOverIndex === index ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            >
              <div className="flex items-center gap-2">
                <div className="cursor-grab active:cursor-grabbing hidden sm:flex items-center justify-center w-6 h-8 hover:bg-muted rounded">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                </div>
                <Input
                  placeholder="Term description"
                  value={item.description}
                  onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                  className="bg-background"
                maxLength={500}
                />
              </div>
              <Input
                type="number"
                min="1"
                placeholder="Qty"
                value={item.quantity || ''}
                onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                className="bg-background"
              />
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  {getCurrencySymbol(invoiceData.invoice.currency)}
                </span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={item.rate || ''}
                  onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  className="bg-background pl-7"
                />
              </div>
              <div className="flex items-center h-10 px-3 bg-background rounded-md border border-input text-sm">
                {getCurrencySymbol(invoiceData.invoice.currency)}
                {(item.quantity * item.rate).toFixed(2)}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeLineItem(item.id)}
                disabled={invoiceData.lineItems.length === 1}
                className="h-10 w-10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addLineItem}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Line Item
          </Button>

          <Separator />

          {/* Totals */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">
                {getCurrencySymbol(invoiceData.invoice.currency)}
                {calculations.subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Discount</span>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={invoiceData.discountRate || ''}
                  onChange={(e) => updateDiscountRate(parseFloat(e.target.value) || 0)}
                  className="w-20 h-8"
                />
                <span className="text-muted-foreground">%</span>
              </div>
              <span className="font-medium text-destructive">
                -{getCurrencySymbol(invoiceData.invoice.currency)}
                {calculations.discountAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Tax</span>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={invoiceData.taxRate || ''}
                  onChange={(e) => updateTaxRate(parseFloat(e.target.value) || 0)}
                  className="w-20 h-8"
                />
                <span className="text-muted-foreground">%</span>
              </div>
              <span className="font-medium">
                {getCurrencySymbol(invoiceData.invoice.currency)}
                {calculations.taxAmount.toFixed(2)}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold">Total</span>
              <span className="font-bold">
                {getCurrencySymbol(invoiceData.invoice.currency)}
                {calculations.total.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Terms & Notes */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Additional Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment-terms">Payment Terms</Label>
            <Textarea
              id="payment-terms"
              placeholder="Payment is due within 30 days..."
              value={invoiceData.paymentTerms}
              onChange={(e) => updatePaymentTerms(e.target.value)}
              rows={2}
              maxLength={1000}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Thank you for your business!"
              value={invoiceData.notes}
              onChange={(e) => updateNotes(e.target.value)}
              rows={2}
              maxLength={2000}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
