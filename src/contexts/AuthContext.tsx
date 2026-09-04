import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAnonymous: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  signInAnonymously: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAnonymous = user?.is_anonymous ?? false;

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        // Seed demo data for new anonymous users
        if (event === 'SIGNED_IN' && session?.user?.is_anonymous) {
          setTimeout(() => {
            seedDemoData(session.user.id);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const seedDemoData = async (userId: string) => {
    try {
      // Check if user already has data to prevent duplicate seeding
      const { data: existingClients } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', userId)
        .limit(1);

      if (existingClients && existingClients.length > 0) {
        return; // User already has data
      }

      // Insert demo club contacts
      const { data: clients, error: clientsError } = await supabase
        .from('clients')
        .insert([
          {
            user_id: userId,
            name: 'Juni Calafat',
            company: 'Real Madrid',
            email: 'recruitment@realmadrid.com',
            address: 'Madrid, Spain',
          },
          {
            user_id: userId,
            name: 'Paul Winstanley',
            company: 'Chelsea FC',
            email: 'recruitment@chelseafc.com',
            address: 'London, England',
          },
          {
            user_id: userId,
            name: 'Deco',
            company: 'FC Barcelona',
            email: 'recruitment@fcbarcelona.com',
            address: 'Barcelona, Spain',
          },
          {
            user_id: userId,
            name: 'Max Eberl',
            company: 'Bayern Munich',
            email: 'recruitment@fcbayern.com',
            address: 'Munich, Germany',
          },
          {
            user_id: userId,
            name: 'Geoffrey Moncada',
            company: 'AC Milan',
            email: 'recruitment@acmilan.com',
            address: 'Milan, Italy',
          },
          {
            user_id: userId,
            name: 'Richard Hughes',
            company: 'Liverpool FC',
            email: 'recruitment@liverpoolfc.com',
            address: 'Liverpool, England',
          },
        ])
        .select();

      if (clientsError || !clients) {
        console.error('Error seeding club contacts:', clientsError);
        return;
      }

      // Insert demo agency reports
      const today = new Date();
      const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      const fifteenDaysAgo = new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000);
      const inFifteenDays = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);

      const agencyDetails = {
        name: 'Invictus Sports Agency',
        email: 'agent@invictus.agency',
        phone: '+1 (216) 555-0140',
        address: 'Cleveland, Ohio',
      };

      await supabase.from('invoices').insert([
        {
          user_id: userId,
          client_id: clients[0].id,
          status: 'paid',
          invoice_number: 'REP-001',
          issue_date: thirtyDaysAgo.toISOString().split('T')[0],
          due_date: fifteenDaysAgo.toISOString().split('T')[0],
          currency: 'EUR',
          total_amount: 3200000,
          subtotal: 3200000,
          tax_rate: 0,
          discount_rate: 0,
          items: [
            { id: '1', description: 'Transfer fee — Mateo Fernández (RW, 19)', quantity: 1, rate: 3000000 },
            { id: '2', description: 'Agency commission', quantity: 1, rate: 200000 },
          ],
          business_details: agencyDetails,
          client_details: {
            name: 'Juni Calafat',
            company: 'Real Madrid',
            email: 'recruitment@realmadrid.com',
            address: 'Madrid, Spain',
          },
          payment_terms: 'Fee payable in three instalments over 24 months.',
          notes: '94% AI match score. Fits the brief for an elite U21 right winger.',
        },
        {
          user_id: userId,
          client_id: clients[1].id,
          status: 'pending',
          invoice_number: 'REP-002',
          issue_date: fifteenDaysAgo.toISOString().split('T')[0],
          due_date: inFifteenDays.toISOString().split('T')[0],
          currency: 'EUR',
          total_amount: 2800000,
          subtotal: 2800000,
          tax_rate: 0,
          discount_rate: 0,
          items: [
            { id: '1', description: 'Transfer fee — Adaeze Okafor (ST, 21)', quantity: 1, rate: 2600000 },
            { id: '2', description: 'Agency commission', quantity: 1, rate: 200000 },
          ],
          business_details: agencyDetails,
          client_details: {
            name: 'Paul Winstanley',
            company: 'Chelsea FC',
            email: 'recruitment@chelseafc.com',
            address: 'London, England',
          },
          payment_terms: 'Fee payable on completion of medical.',
          notes: '21 goals in 28 appearances. 0.78 xG/90.',
        },
        {
          user_id: userId,
          client_id: clients[2].id,
          status: 'draft',
          invoice_number: 'REP-003',
          issue_date: today.toISOString().split('T')[0],
          due_date: inFifteenDays.toISOString().split('T')[0],
          currency: 'EUR',
          total_amount: 1500000,
          subtotal: 1500000,
          tax_rate: 0,
          discount_rate: 0,
          items: [
            { id: '1', description: 'Loan package — Lucas Santos (CM, 20, Flamengo)', quantity: 1, rate: 1500000 },
          ],
          business_details: agencyDetails,
          client_details: {
            name: 'Deco',
            company: 'FC Barcelona',
            email: 'recruitment@fcbarcelona.com',
            address: 'Barcelona, Spain',
          },
          payment_terms: 'Season long loan with option to buy.',
          notes: '35 apps, 6 goals, 12 assists, 88% pass accuracy.',
        },
        {
          user_id: userId,
          client_id: clients[4].id,
          status: 'pending',
          invoice_number: 'REP-004',
          issue_date: today.toISOString().split('T')[0],
          due_date: inFifteenDays.toISOString().split('T')[0],
          currency: 'EUR',
          total_amount: 4100000,
          subtotal: 4100000,
          tax_rate: 0,
          discount_rate: 0,
          items: [
            { id: '1', description: 'Transfer fee — Jonas Berg (CB, 22, FC Midtjylland)', quantity: 1, rate: 3900000 },
            { id: '2', description: 'Agency commission', quantity: 1, rate: 200000 },
          ],
          business_details: agencyDetails,
          client_details: {
            name: 'Geoffrey Moncada',
            company: 'AC Milan',
            email: 'recruitment@acmilan.com',
            address: 'Milan, Italy',
          },
          payment_terms: '50% payable on signing, balance after 20 appearances.',
          notes: '30 apps, 71% duels won, 5.2 interceptions per 90.',
        },
        {
          user_id: userId,
          client_id: clients[3].id,
          status: 'overdue',
          invoice_number: 'REP-005',
          issue_date: thirtyDaysAgo.toISOString().split('T')[0],
          due_date: fifteenDaysAgo.toISOString().split('T')[0],
          currency: 'EUR',
          total_amount: 5600000,
          subtotal: 5600000,
          tax_rate: 0,
          discount_rate: 0,
          items: [
            { id: '1', description: 'Transfer fee — Théo Renard (ST, 23, Stade de Reims)', quantity: 1, rate: 5300000 },
            { id: '2', description: 'Agency commission', quantity: 1, rate: 300000 },
          ],
          business_details: agencyDetails,
          client_details: {
            name: 'Max Eberl',
            company: 'Bayern Munich',
            email: 'recruitment@fcbayern.com',
            address: 'Munich, Germany',
          },
          payment_terms: 'Deal stalled pending revised wage structure.',
          notes: '29 apps, 17 goals, 4 assists, 0.71 xG/90.',
        },
        {
          user_id: userId,
          client_id: clients[5].id,
          status: 'draft',
          invoice_number: 'REP-006',
          issue_date: today.toISOString().split('T')[0],
          due_date: inFifteenDays.toISOString().split('T')[0],
          currency: 'EUR',
          total_amount: 2200000,
          subtotal: 2200000,
          tax_rate: 0,
          discount_rate: 0,
          items: [
            { id: '1', description: 'Transfer fee — Lucía Vidal (CM, 20, FC Barcelona)', quantity: 1, rate: 2200000 },
          ],
          business_details: agencyDetails,
          client_details: {
            name: 'Richard Hughes',
            company: 'Liverpool FC',
            email: 'recruitment@liverpoolfc.com',
            address: 'Liverpool, England',
          },
          payment_terms: 'Draft terms, awaiting sporting director feedback.',
          notes: '26 apps, 8 goals, 11 assists, 91% pass accuracy.',
        },
      ]);
    } catch (error) {
      console.error('Error seeding demo data:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, name: string) => {
    // The confirmation link must land on /auth/callback, which turns the code in the
    // URL into a session and THEN forwards to the app. Pointing it straight at a
    // protected route races ProtectedRoute and bounces the user back to /signin.
    const redirectUrl = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { full_name: name },
      },
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signInAnonymously = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();
    
    // Wait for seeding to complete BEFORE returning, ensuring dashboard has data
    if (!error && data.user?.is_anonymous) {
      await seedDemoData(data.user.id);
    }
    
    return { error: error as Error | null };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAnonymous,
        signIn,
        signUp,
        signOut,
        signInAnonymously,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
