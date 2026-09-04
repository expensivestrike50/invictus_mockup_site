export interface BusinessDetails {
  name: string;
  logo: string | null;
  address: string;
  email: string;
  phone: string;
}

export interface ClientDetails {
  name: string;
  company: string;
  address: string;
  email: string;
}

export interface InvoiceDetails {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  currency: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue';

export interface InvoiceData {
  business: BusinessDetails;
  client: ClientDetails;
  invoice: InvoiceDetails;
  lineItems: LineItem[];
  taxRate: number;
  discountRate: number;
  paymentTerms: string;
  notes: string;
  status: InvoiceStatus;
  clientId: string | null;
}

export type InvoiceTemplate = 'minimal' | 'modern' | 'bold';

export interface TemplateStyles {
  accentColor: string;
  fontFamily: string;
}

export const INVOICE_STATUSES: { value: InvoiceStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' },
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

export const ACCENT_COLORS = [
  { name: 'Slate', value: '#0a101d' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Purple', value: '#7c3aed' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Green', value: '#16a34a' },
];

export const FONT_OPTIONS = [
  { name: 'Inter', value: "'Inter', sans-serif" },
  { name: 'Geist', value: "'Geist', sans-serif" },
  { name: 'DM Mono', value: "'DM Mono', monospace" },
  { name: 'Georgia', value: "Georgia, serif" },
  { name: 'Playfair', value: "'Playfair Display', serif" },
  { name: 'Nunito', value: "'Nunito', sans-serif" },
];
