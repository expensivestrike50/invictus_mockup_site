import { useState, useCallback, useMemo } from 'react';
import { InvoiceData, LineItem, InvoiceTemplate, TemplateStyles, InvoiceStatus } from '@/types/invoice';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const generateId = () => Math.random().toString(36).substring(2, 9);

const getDefaultInvoiceData = (): InvoiceData => ({
  business: {
    name: '',
    logo: null,
    address: '',
    email: '',
    phone: '',
  },
  client: {
    name: '',
    company: '',
    address: '',
    email: '',
  },
  invoice: {
    invoiceNumber: `INV-${String(Date.now()).slice(-6)}`,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'USD',
  },
  lineItems: [
    { id: generateId(), description: '', quantity: 1, rate: 0 },
  ],
  taxRate: 0,
  discountRate: 0,
  paymentTerms: 'Payment is due within 30 days of invoice date.',
  notes: '',
  status: 'draft',
  clientId: null,
});

export function useInvoice() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(getDefaultInvoiceData);
  const [template, setTemplate] = useState<InvoiceTemplate>('minimal');
  const [templateStyles, setTemplateStyles] = useState<TemplateStyles>({
    accentColor: '#0a101d',
    fontFamily: "'Inter', sans-serif",
  });
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const updateBusiness = useCallback((field: keyof InvoiceData['business'], value: string | null) => {
    setInvoiceData(prev => ({
      ...prev,
      business: { ...prev.business, [field]: value },
    }));
  }, []);

  const updateClient = useCallback((field: keyof InvoiceData['client'], value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      client: { ...prev.client, [field]: value },
    }));
  }, []);

  const updateInvoice = useCallback((field: keyof InvoiceData['invoice'], value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      invoice: { ...prev.invoice, [field]: value },
    }));
  }, []);

  const updateLineItem = useCallback((id: string, field: keyof LineItem, value: string | number) => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }, []);

  const addLineItem = useCallback(() => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { id: generateId(), description: '', quantity: 1, rate: 0 }],
    }));
  }, []);

  const removeLineItem = useCallback((id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id),
    }));
  }, []);

  const reorderLineItems = useCallback((fromIndex: number, toIndex: number) => {
    setInvoiceData(prev => {
      const newItems = [...prev.lineItems];
      const [removed] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, removed);
      return { ...prev, lineItems: newItems };
    });
  }, []);

  const updateTaxRate = useCallback((rate: number) => {
    setInvoiceData(prev => ({ ...prev, taxRate: rate }));
  }, []);

  const updateDiscountRate = useCallback((rate: number) => {
    setInvoiceData(prev => ({ ...prev, discountRate: rate }));
  }, []);

  const updatePaymentTerms = useCallback((terms: string) => {
    setInvoiceData(prev => ({ ...prev, paymentTerms: terms }));
  }, []);

  const updateNotes = useCallback((notes: string) => {
    setInvoiceData(prev => ({ ...prev, notes }));
  }, []);

  const updateStatus = useCallback((status: InvoiceStatus) => {
    setInvoiceData(prev => ({ ...prev, status }));
  }, []);

  const updateClientId = useCallback((clientId: string | null) => {
    setInvoiceData(prev => ({ ...prev, clientId }));
  }, []);

  const setClientFromSaved = useCallback((client: {
    id: string;
    name: string;
    company: string | null;
    email: string | null;
    address: string | null;
  }) => {
    setInvoiceData(prev => ({
      ...prev,
      clientId: client.id,
      client: {
        name: client.name,
        company: client.company || '',
        email: client.email || '',
        address: client.address || '',
      },
    }));
  }, []);

  const calculations = useMemo(() => {
    const subtotal = invoiceData.lineItems.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );
    const discountAmount = subtotal * (invoiceData.discountRate / 100);
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (invoiceData.taxRate / 100);
    const total = taxableAmount + taxAmount;

    return { subtotal, discountAmount, taxAmount, total };
  }, [invoiceData.lineItems, invoiceData.taxRate, invoiceData.discountRate]);

  const saveInvoice = useCallback(async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not authenticated',
        description: 'Please sign in to save invoices.',
      });
      return false;
    }

    setIsSaving(true);

    try {
      const invoicePayload = {
        user_id: user.id,
        client_id: invoiceData.clientId,
        status: invoiceData.status,
        invoice_number: invoiceData.invoice.invoiceNumber,
        issue_date: invoiceData.invoice.issueDate,
        due_date: invoiceData.invoice.dueDate,
        currency: invoiceData.invoice.currency,
        total_amount: calculations.total,
        subtotal: calculations.subtotal,
        tax_rate: invoiceData.taxRate,
        discount_rate: invoiceData.discountRate,
        items: JSON.parse(JSON.stringify(invoiceData.lineItems)),
        business_details: JSON.parse(JSON.stringify(invoiceData.business)),
        client_details: JSON.parse(JSON.stringify(invoiceData.client)),
        payment_terms: invoiceData.paymentTerms,
        notes: invoiceData.notes,
        template: template,
        template_styles: JSON.parse(JSON.stringify(templateStyles)),
      };

      if (invoiceId) {
        // Update existing invoice
        const { error } = await supabase
          .from('invoices')
          .update(invoicePayload)
          .eq('id', invoiceId)
          .eq('user_id', user.id);

        if (error) throw error;

        toast({
          title: 'Invoice updated',
          description: 'Your invoice has been saved successfully.',
        });
      } else {
        // Create new invoice
        const { data, error } = await supabase
          .from('invoices')
          .insert(invoicePayload)
          .select()
          .single();

        if (error) throw error;
        
        setInvoiceId(data.id);

        toast({
          title: 'Invoice saved',
          description: 'Your invoice has been created successfully.',
        });
      }

      return true;
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save invoice. Please try again.',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [user, invoiceData, calculations, template, templateStyles, invoiceId, toast]);

  const loadInvoice = useCallback(async (id: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast({
          variant: 'destructive',
          title: 'Invoice not found',
          description: 'The invoice you are looking for does not exist.',
        });
        return false;
      }

      // Parse the jsonb fields with proper type casting
      const items = Array.isArray(data.items) ? (data.items as unknown as LineItem[]) : [];
      const businessDetails = (data.business_details as unknown as InvoiceData['business']) || getDefaultInvoiceData().business;
      const clientDetails = (data.client_details as unknown as InvoiceData['client']) || getDefaultInvoiceData().client;
      const styles = (data.template_styles as unknown as TemplateStyles) || { accentColor: '#0a101d', fontFamily: "'Inter', sans-serif" };

      setInvoiceData({
        business: businessDetails,
        client: clientDetails,
        invoice: {
          invoiceNumber: data.invoice_number,
          issueDate: data.issue_date,
          dueDate: data.due_date,
          currency: data.currency,
        },
        lineItems: items.length > 0 ? items : [{ id: generateId(), description: '', quantity: 1, rate: 0 }],
        taxRate: Number(data.tax_rate) || 0,
        discountRate: Number(data.discount_rate) || 0,
        paymentTerms: data.payment_terms || '',
        notes: data.notes || '',
        status: data.status as InvoiceStatus,
        clientId: data.client_id,
      });

      setTemplate(data.template as InvoiceTemplate);
      setTemplateStyles(styles);
      setInvoiceId(data.id);

      return true;
    } catch (error) {
      console.error('Error loading invoice:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load invoice.',
      });
      return false;
    }
  }, [user, toast]);

  const resetInvoice = useCallback(() => {
    setInvoiceData(getDefaultInvoiceData());
    setInvoiceId(null);
  }, []);

  return {
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
    updateClientId,
    setClientFromSaved,
    calculations,
    saveInvoice,
    loadInvoice,
    resetInvoice,
  };
}
