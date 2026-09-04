import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, Plus, Search } from 'lucide-react';
import { CLUB_DIRECTORY, LEAGUES, ClubEntry } from '@/data/clubs';
import { cn } from '@/lib/utils';

interface ClubDirectoryProps {
  savedClubNames: string[];
  onAdd: (club: ClubEntry) => void;
  addingId?: string | null;
}

export function ClubDirectory({ savedClubNames, onAdd, addingId }: ClubDirectoryProps) {
  const [query, setQuery] = useState('');
  const [league, setLeague] = useState<string>('All leagues');

  const saved = useMemo(
    () => new Set(savedClubNames.map((n) => n.toLowerCase())),
    [savedClubNames]
  );

  const clubs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CLUB_DIRECTORY.filter((club) => {
      const matchesLeague = league === 'All leagues' || club.league === league;
      const matchesQuery =
        !q ||
        club.name.toLowerCase().includes(q) ||
        club.country.toLowerCase().includes(q) ||
        club.city.toLowerCase().includes(q) ||
        club.director.toLowerCase().includes(q);
      return matchesLeague && matchesQuery;
    });
  }, [query, league]);

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">
            Club Directory
          </p>
          <h2 className="text-xl font-semibold text-foreground">
            Clubs and sporting directors you can pitch
          </h2>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search club, city or director"
            className="pl-9 bg-white"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {LEAGUES.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLeague(l)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
              league === l
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-white text-muted-foreground hover:text-foreground'
            )}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {clubs.map((club) => {
          const isSaved = saved.has(club.name.toLowerCase());
          return (
            <Card key={club.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
                    {club.crest ? (
                      <img
                        src={club.crest}
                        alt={`${club.name} crest`}
                        loading="lazy"
                        width={48}
                        height={48}
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <span className="text-xs font-bold text-foreground">{club.short}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground truncate">{club.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {club.city}, {club.country}
                    </p>
                    <Badge variant="secondary" className="mt-2 text-[11px]">
                      {club.league}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-sm">
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Sporting director: </span>
                    {club.director}
                  </p>
                  <p className="text-muted-foreground truncate">{club.email}</p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Brief: </span>
                    {club.focus}
                  </p>
                </div>

                <Button
                  variant={isSaved ? 'outline' : 'invofy'}
                  size="sm"
                  className="mt-4 w-full"
                  disabled={isSaved || addingId === club.id}
                  onClick={() => onAdd(club)}
                >
                  {isSaved ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      In your network
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      {addingId === club.id ? 'Adding...' : 'Add to network'}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {clubs.length === 0 && (
        <p className="text-sm text-muted-foreground">No clubs match that search.</p>
      )}
    </section>
  );
}
