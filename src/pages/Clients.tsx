import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ClientFormModal, ClientFormData } from '@/components/clients/ClientFormModal';
import { ArrowLeft, Plus, Pencil, Trash2, Users, Loader2 } from 'lucide-react';
import { BrandLogo } from '@/components/base/brand-logo';
import { ClubDirectory } from '@/components/clients/ClubDirectory';
import { ClubEntry } from '@/data/clubs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface Client {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  address: string | null;
  tax_id: string | null;
  created_at: string;
}


export default function Clients() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [addingClubId, setAddingClubId] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, [user]);

  const fetchClients = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load club contacts.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClub = async (club: ClubEntry) => {
    if (!user) return;
    setAddingClubId(club.id);
    try {
      const { data: newClient, error } = await supabase
        .from('clients')
        .insert({
          user_id: user.id,
          name: club.director,
          company: club.name,
          email: club.email,
          address: `${club.city}, ${club.country}`,
          tax_id: null,
        })
        .select()
        .single();

      if (error) throw error;
      setClients((prev) => [newClient, ...prev]);
      toast({ title: 'Club added', description: `${club.name} is now in your network.` });
    } catch (error) {
      console.error('Error adding club:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to add club.' });
    } finally {
      setAddingClubId(null);
    }
  };

  const handleOpenCreate = () => {
    setEditingClient(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: ClientFormData) => {
    if (!user) return;
    setIsSubmitting(true);

    try {
      if (modalMode === 'create') {
        const { data: newClient, error } = await supabase
          .from('clients')
          .insert({
            user_id: user.id,
            name: data.name,
            company: data.company || null,
            email: data.email || null,
            address: data.address || null,
            tax_id: data.tax_id || null,
          })
          .select()
          .single();

        if (error) throw error;
        setClients((prev) => [newClient, ...prev]);
        toast({ title: 'Contact added', description: 'The club contact has been added.' });
      } else if (editingClient) {
        const { data: updatedClient, error } = await supabase
          .from('clients')
          .update({
            name: data.name,
            company: data.company || null,
            email: data.email || null,
            address: data.address || null,
            tax_id: data.tax_id || null,
          })
          .eq('id', editingClient.id)
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;
        setClients((prev) =>
          prev.map((c) => (c.id === editingClient.id ? updatedClient : c))
        );
        toast({ title: 'Contact updated', description: 'The club contact has been updated.' });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving client:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save club contact.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    setIsDeletingId(id);
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      if (error) throw error;

      setClients((prev) => prev.filter((c) => c.id !== id));
      toast({ title: 'Contact deleted', description: 'The club contact has been removed.' });
    } catch (error) {
      console.warn('Failed to delete client');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete client.',
      });
    } finally {
      setIsDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading clients...</p>
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
              <BrandLogo className="h-8" />
              <span className="font-semibold text-sm sm:text-lg">Clubs</span>
            </div>
          </div>

          <Button
            variant="invofy"
            size="invofy"
            onClick={handleOpenCreate}
            className="max-[479px]:px-4 max-[479px]:py-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn(
        "container py-6 px-4",
        isMobile ? "max-w-full" : "max-w-[1400px]"
      )}>
        {clients.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No club contacts yet</h3>
                <p className="text-muted-foreground mb-4">Add your first club or sporting director to start tracking conversations.</p>
                <Button variant="invofy" size="invofy" onClick={handleOpenCreate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : isMobile ? (
          <div className="space-y-3">
            {clients.map((client) => (
              <Card key={client.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{client.name}</p>
                      {client.company && (
                        <p className="text-sm text-muted-foreground">{client.company}</p>
                      )}
                    </div>
                  </div>
                  {client.email && (
                    <p className="text-sm text-muted-foreground mb-1">{client.email}</p>
                  )}
                  {client.address && (
                    <p className="text-sm text-muted-foreground mb-3">{client.address}</p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleOpenEdit(client)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {client.name}? This will also affect any agency reports linked to this contact.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(client.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {isDeletingId === client.id ? 'Deleting...' : 'Delete'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.company || '-'}</TableCell>
                    <TableCell>{client.email || '-'}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{client.address || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(client)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {client.name}? This will also affect any agency reports linked to this contact.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(client.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {isDeletingId === client.id ? 'Deleting...' : 'Delete'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        <ClubDirectory
          savedClubNames={clients.map((c) => c.company || '').filter(Boolean)}
          onAdd={handleAddClub}
          addingId={addingClubId}
        />
      </main>

      {/* Client Form Modal */}
      <ClientFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleSubmit}
        initialData={
          editingClient
            ? {
                name: editingClient.name,
                company: editingClient.company || '',
                email: editingClient.email || '',
                address: editingClient.address || '',
                tax_id: editingClient.tax_id || '',
              }
            : undefined
        }
        isSubmitting={isSubmitting}
        mode={modalMode}
      />
    </div>
  );
}
