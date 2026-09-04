import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { InvoiceList, Invoice } from '@/components/dashboard/InvoiceList';
import { TalentMap } from '@/components/dashboard/TalentMap';
import { MatchWatchlist } from '@/components/dashboard/MatchWatchlist';
import { DealPipeline } from '@/components/dashboard/DealPipeline';
import { ArrowLeft, Plus, FileText, Users, LogOut, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { BrandLogo } from '@/components/base/brand-logo';

export default function Dashboard() {
  const { user, isAnonymous, signOut } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clientsCount, setClientsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    try {
      // Fetch invoices
      const { data: invoicesData, error: invoicesError } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (invoicesError) throw invoicesError;

      // Fetch clients count
      const { count, error: clientsError } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (clientsError) throw clientsError;

      setInvoices((invoicesData || []) as Invoice[]);
      setClientsCount(count || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load dashboard data.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    if (!user) return;
    setIsDeletingId(id);
    try {
      // Defense-in-depth: also filter by user_id even though RLS enforces it
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      if (error) throw error;

      setInvoices((prev) => prev.filter((inv) => inv.id !== id));
      toast({
        title: 'Report deleted',
        description: 'The agency report has been deleted successfully.',
      });
    } catch (error) {
      console.warn('Failed to delete invoice');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete report.',
      });
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Calculate stats
  const totalRevenue = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + Number(inv.total_amount), 0);
  
  const pendingAmount = invoices
    .filter((inv) => inv.status === 'pending')
    .reduce((sum, inv) => sum + Number(inv.total_amount), 0);
  
  const overdueAmount = invoices
    .filter((inv) => inv.status === 'overdue')
    .reduce((sum, inv) => sum + Number(inv.total_amount), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
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
            <Link to="/" className="flex items-center gap-2 no-underline">
              <BrandLogo className="h-9" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {isAnonymous && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                Demo Mode
              </span>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link to="/clubs">
                <Users className="h-4 w-4 mr-2" />
                <span className="max-[479px]:hidden">Clubs</span>
              </Link>
            </Button>
            <Button variant="invofy" size="invofy" asChild className="max-[479px]:px-4 max-[479px]:py-2">
              <Link to="/reports">
                <Plus className="h-4 w-4 mr-2" />
                <span className="max-[479px]:hidden">New Report</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn(
        "container py-6 px-4",
        isMobile ? "max-w-full" : "max-w-[1400px]"
      )}>
        <div className="space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-display">
              Welcome{isAnonymous ? ' to Demo Mode' : ' back'}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {isAnonymous
                ? 'Explore the agency CRM with sample data. Sign up to save your work!'
                : 'Here\'s an overview of your agency activity, players and reports.'}
            </p>
          </div>

          {/* Stats Cards */}
          <StatsCards
            totalRevenue={totalRevenue}
            pendingAmount={pendingAmount}
            overdueAmount={overdueAmount}
            totalClients={clientsCount}
          />

          {/* Football CRM visuals */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TalentMap />
            </div>
            <MatchWatchlist />
          </div>

          <DealPipeline />

          {/* Recent Invoices */}
          <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">Agency Reports</h2>
          </div>
            <InvoiceList
              invoices={invoices}
              onDelete={handleDeleteInvoice}
              isDeleting={isDeletingId}
            />
          </div>

          {/* Upgrade CTA for anonymous users */}
          {isAnonymous && (
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ready to save your work?
              </h3>
              <p className="text-muted-foreground mb-4">
                Create a free account to keep your players, reports and club conversations forever.
              </p>
              <Button variant="invofy" size="invofy" asChild>
                <Link to="/signup">Create Account</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
