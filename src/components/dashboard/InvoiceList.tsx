import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Eye, Trash2, FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

import player01 from '@/assets/players/player-01.jpg';
import player02 from '@/assets/players/player-02.jpg';
import player03 from '@/assets/players/player-03.jpg';
import player04 from '@/assets/players/player-04.jpg';
import player05 from '@/assets/players/player-05.jpg';
import player06 from '@/assets/players/player-06.jpg';
import crestRealMadrid from '@/assets/clubs/real-madrid.png';
import crestChelsea from '@/assets/clubs/chelsea.png';
import crestBarcelona from '@/assets/clubs/barcelona.png';
import crestAcMilan from '@/assets/clubs/ac-milan.png';
import crestBayern from '@/assets/clubs/bayern.png';
import crestLiverpool from '@/assets/clubs/liverpool.png';

export interface Invoice {
  id: string;
  invoice_number: string;
  client_details: {
    name?: string;
    company?: string;
  };
  total_amount: number;
  currency: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  issue_date: string;
  due_date: string;
}

interface PlayerProfile {
  name: string;
  meta: string; // position · age · current club
  photo: string;
  club: string;
  crest: string;
  stats: string;
}

const playerProfiles: PlayerProfile[] = [
  {
    name: 'Mateo Fernández',
    meta: 'RW · 19 · River Plate',
    photo: player01,
    club: 'Real Madrid',
    crest: crestRealMadrid,
    stats: '32 apps · 14 goals · 9 assists · 0.61 xG/90',
  },
  {
    name: 'Adaeze Okafor',
    meta: 'ST · 21 · Enyimba FC',
    photo: player02,
    club: 'Chelsea',
    crest: crestChelsea,
    stats: '28 apps · 21 goals · 5 assists · 0.78 xG/90',
  },
  {
    name: 'Lucas Santos',
    meta: 'CM · 20 · Flamengo',
    photo: player03,
    club: 'FC Barcelona',
    crest: crestBarcelona,
    stats: '35 apps · 6 goals · 12 assists · 88% pass',
  },
  {
    name: 'Jonas Berg',
    meta: 'CB · 22 · FC Midtjylland',
    photo: player04,
    club: 'AC Milan',
    crest: crestAcMilan,
    stats: '30 apps · 71% duels won · 5.2 int/90',
  },
  {
    name: 'Théo Renard',
    meta: 'ST · 23 · Stade de Reims',
    photo: player05,
    club: 'Bayern Munich',
    crest: crestBayern,
    stats: '29 apps · 17 goals · 4 assists · 0.71 xG/90',
  },
  {
    name: 'Lucía Vidal',
    meta: 'CM · 20 · FC Barcelona',
    photo: player06,
    club: 'Liverpool',
    crest: crestLiverpool,
    stats: '26 apps · 8 goals · 11 assists · 91% pass',
  },
];

const profileFor = (index: number) => playerProfiles[index % playerProfiles.length];

interface InvoiceListProps {
  invoices: Invoice[];
  onDelete: (id: string) => void;
  isDeleting?: string | null;
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  draft: { bg: 'bg-gray-100', text: 'text-gray-700' },
  pending: { bg: 'bg-amber-100', text: 'text-amber-700' },
  paid: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  overdue: { bg: 'bg-red-100', text: 'text-red-700' },
};

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  pending: 'In Talks',
  paid: 'Closed',
  overdue: 'Stalled',
};

const getCurrencySymbol = (code: string) => {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
    JPY: '¥',
    INR: '₹',
  };
  return symbols[code] || '$';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export function InvoiceList({ invoices, onDelete, isDeleting }: InvoiceListProps) {
  const isMobile = useIsMobile();

  if (invoices.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No agency reports yet</h3>
            <p className="text-muted-foreground mb-4">Create your first report to justify a player to a club.</p>
            <Button variant="invofy" size="invofy" asChild>
              <Link to="/reports">Create Report</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-3">
        {invoices.map((invoice, index) => {
          const p = profileFor(index);
          return (
            <Card key={invoice.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.photo}
                      alt={p.name}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.meta}</p>
                    </div>
                  </div>
                  <Badge className={`${statusStyles[invoice.status].bg} ${statusStyles[invoice.status].text} border-0`}>
                    {statusLabels[invoice.status] || invoice.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <img src={p.crest} alt={`${p.club} crest`} loading="lazy" className="h-6 w-6 object-contain" />
                  <p className="text-sm text-foreground font-medium">{p.club}</p>
                </div>
                <p className="text-[11px] text-muted-foreground mb-3">{p.stats}</p>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-lg font-bold text-foreground">
                    {getCurrencySymbol(invoice.currency)}
                    {invoice.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Deadline: {formatDate(invoice.due_date)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link to={`/reports/${invoice.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Report</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {invoice.invoice_number}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(invoice.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isDeleting === invoice.id ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <Card className="border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead>Club</TableHead>
            <TableHead>Key Stats</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => {
            const p = profileFor(index);
            return (
              <TableRow key={invoice.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={p.photo}
                      alt={p.name}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground">{p.meta}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img src={p.crest} alt={`${p.club} crest`} loading="lazy" className="h-7 w-7 object-contain" />
                    <span className="font-medium text-foreground">{p.club}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {p.stats}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {getCurrencySymbol(invoice.currency)}
                  {invoice.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <Badge className={`${statusStyles[invoice.status].bg} ${statusStyles[invoice.status].text} border-0`}>
                    {statusLabels[invoice.status] || invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(invoice.due_date)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/reports/${invoice.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Report</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {invoice.invoice_number}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(invoice.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {isDeleting === invoice.id ? 'Deleting...' : 'Delete'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
