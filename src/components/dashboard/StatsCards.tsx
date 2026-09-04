import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Clock, AlertTriangle, Users } from 'lucide-react';

interface StatsCardsProps {
  totalRevenue: number;
  pendingAmount: number;
  overdueAmount: number;
  totalClients: number;
  currency?: string;
}

export function StatsCards({
  totalRevenue,
  pendingAmount,
  overdueAmount,
  totalClients,
  currency = '$',
}: StatsCardsProps) {
  const stats = [
    {
      title: 'Commission Earned',
      value: `${currency}${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      description: 'From completed deals',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'In Negotiation',
      value: `${currency}${pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Clock,
      description: 'Awaiting agreement',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Stalled Deals',
      value: `${currency}${overdueAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: AlertTriangle,
      description: 'Past expected deadline',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Players',
      value: totalClients.toString(),
      icon: Users,
      description: 'Players represented',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.iconBg}`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
