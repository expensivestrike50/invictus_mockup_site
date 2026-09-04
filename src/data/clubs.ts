import realMadrid from '@/assets/clubs/real-madrid.png';
import barcelona from '@/assets/clubs/barcelona.png';
import chelsea from '@/assets/clubs/chelsea.png';
import liverpool from '@/assets/clubs/liverpool.png';
import acMilan from '@/assets/clubs/ac-milan.png';
import bayern from '@/assets/clubs/bayern.png';

export interface ClubEntry {
  id: string;
  name: string;
  short: string;
  league: string;
  country: string;
  city: string;
  director: string;
  email: string;
  crest?: string;
  focus: string;
}

export const LEAGUES = [
  'All leagues',
  'Premier League',
  'La Liga',
  'Serie A',
  'Bundesliga',
  'Ligue 1',
  'Eredivisie',
  'Primeira Liga',
  'MLS',
] as const;

export const CLUB_DIRECTORY: ClubEntry[] = [
  { id: 'real-madrid', name: 'Real Madrid', short: 'RM', league: 'La Liga', country: 'Spain', city: 'Madrid', director: 'Juni Calafat', email: 'recruitment@realmadrid.com', crest: realMadrid, focus: 'Elite U21 attackers' },
  { id: 'barcelona', name: 'FC Barcelona', short: 'FCB', league: 'La Liga', country: 'Spain', city: 'Barcelona', director: 'Deco', email: 'sporting@fcbarcelona.com', crest: barcelona, focus: 'Ball-playing midfielders' },
  { id: 'chelsea', name: 'Chelsea FC', short: 'CFC', league: 'Premier League', country: 'England', city: 'London', director: 'Paul Winstanley', email: 'recruitment@chelseafc.com', crest: chelsea, focus: 'High-ceiling forwards' },
  { id: 'liverpool', name: 'Liverpool FC', short: 'LFC', league: 'Premier League', country: 'England', city: 'Liverpool', director: 'Richard Hughes', email: 'scouting@liverpoolfc.com', crest: liverpool, focus: 'Pressing wide players' },
  { id: 'ac-milan', name: 'AC Milan', short: 'ACM', league: 'Serie A', country: 'Italy', city: 'Milan', director: 'Geoffrey Moncada', email: 'area.tecnica@acmilan.com', crest: acMilan, focus: 'Centre-backs, left side' },
  { id: 'bayern', name: 'Bayern Munich', short: 'FCB', league: 'Bundesliga', country: 'Germany', city: 'Munich', director: 'Max Eberl', email: 'kaderplanung@fcbayern.com', crest: bayern, focus: 'Proven European strikers' },

  { id: 'arsenal', name: 'Arsenal FC', short: 'AFC', league: 'Premier League', country: 'England', city: 'London', director: 'Andrea Berta', email: 'recruitment@arsenal.co.uk', focus: 'Left-footed full-backs' },
  { id: 'brighton', name: 'Brighton & Hove Albion', short: 'BHA', league: 'Premier League', country: 'England', city: 'Brighton', director: 'David Weir', email: 'scouting@brightonfc.com', focus: 'South American U20 talent' },
  { id: 'brentford', name: 'Brentford FC', short: 'BFC', league: 'Premier League', country: 'England', city: 'London', director: 'Phil Giles', email: 'recruitment@brentfordfc.com', focus: 'Data-led Scandinavian signings' },
  { id: 'atletico', name: 'Atlético de Madrid', short: 'ATM', league: 'La Liga', country: 'Spain', city: 'Madrid', director: 'Carlos Bucero', email: 'direccion@atleticodemadrid.com', focus: 'Physical wide defenders' },
  { id: 'real-sociedad', name: 'Real Sociedad', short: 'RSO', league: 'La Liga', country: 'Spain', city: 'San Sebastián', director: 'Roberto Olabe', email: 'futbol@realsociedad.eus', focus: 'Technical No. 8s' },
  { id: 'villarreal', name: 'Villarreal CF', short: 'VCF', league: 'La Liga', country: 'Spain', city: 'Villarreal', director: 'Miguel Ángel Tena', email: 'deportiva@villarrealcf.es', focus: 'Loan-ready attackers' },
  { id: 'inter', name: 'Inter Milan', short: 'INT', league: 'Serie A', country: 'Italy', city: 'Milan', director: 'Piero Ausilio', email: 'mercato@inter.it', focus: 'Free-agent experience' },
  { id: 'atalanta', name: 'Atalanta BC', short: 'ATA', league: 'Serie A', country: 'Italy', city: 'Bergamo', director: 'Tony D\u2019Amico', email: 'area.sportiva@atalanta.it', focus: 'Vertical wing-backs' },
  { id: 'bologna', name: 'Bologna FC', short: 'BFC', league: 'Serie A', country: 'Italy', city: 'Bologna', director: 'Marco Di Vaio', email: 'sportiva@bolognafc.it', focus: 'Second-division breakouts' },
  { id: 'leverkusen', name: 'Bayer Leverkusen', short: 'B04', league: 'Bundesliga', country: 'Germany', city: 'Leverkusen', director: 'Simon Rolfes', email: 'kader@bayer04.de', focus: 'Versatile U23 profiles' },
  { id: 'dortmund', name: 'Borussia Dortmund', short: 'BVB', league: 'Bundesliga', country: 'Germany', city: 'Dortmund', director: 'Sebastian Kehl', email: 'lizenzbereich@bvb.de', focus: 'High-resale wingers' },
  { id: 'stuttgart', name: 'VfB Stuttgart', short: 'VFB', league: 'Bundesliga', country: 'Germany', city: 'Stuttgart', director: 'Fabian Wohlgemuth', email: 'sport@vfb.de', focus: 'Box-to-box midfielders' },
  { id: 'lille', name: 'LOSC Lille', short: 'LOSC', league: 'Ligue 1', country: 'France', city: 'Lille', director: 'Olivier L\u00e9tang', email: 'recrutement@losc.fr', focus: 'African market strikers' },
  { id: 'monaco', name: 'AS Monaco', short: 'ASM', league: 'Ligue 1', country: 'Monaco', city: 'Monaco', director: 'Thiago Scuro', email: 'sportif@asmonaco.com', focus: 'Resale-model U21s' },
  { id: 'rennes', name: 'Stade Rennais', short: 'SRFC', league: 'Ligue 1', country: 'France', city: 'Rennes', director: 'Fr\u00e9d\u00e9ric Massara', email: 'cellule@staderennais.fr', focus: 'Academy-ready talent' },
  { id: 'ajax', name: 'AFC Ajax', short: 'AJX', league: 'Eredivisie', country: 'Netherlands', city: 'Amsterdam', director: 'Alex Kroes', email: 'scouting@ajax.nl', focus: 'Technical teenagers' },
  { id: 'psv', name: 'PSV Eindhoven', short: 'PSV', league: 'Eredivisie', country: 'Netherlands', city: 'Eindhoven', director: 'Earnest Stewart', email: 'technisch@psv.nl', focus: 'North American prospects' },
  { id: 'feyenoord', name: 'Feyenoord', short: 'FEY', league: 'Eredivisie', country: 'Netherlands', city: 'Rotterdam', director: 'Dennis te Kloese', email: 'sport@feyenoord.nl', focus: 'Physical No. 9s' },
  { id: 'benfica', name: 'SL Benfica', short: 'SLB', league: 'Primeira Liga', country: 'Portugal', city: 'Lisbon', director: 'Rui Pedro Braz', email: 'futebol@slbenfica.pt', focus: 'Brazilian pipeline' },
  { id: 'porto', name: 'FC Porto', short: 'FCP', league: 'Primeira Liga', country: 'Portugal', city: 'Porto', director: 'Andoni Zubizarreta', email: 'scouting@fcporto.pt', focus: 'Set-piece specialists' },
  { id: 'braga', name: 'SC Braga', short: 'SCB', league: 'Primeira Liga', country: 'Portugal', city: 'Braga', director: 'Jo\u00e3o Faria', email: 'futebol@scbraga.pt', focus: 'West African scouting' },
  { id: 'lafc', name: 'Los Angeles FC', short: 'LAFC', league: 'MLS', country: 'USA', city: 'Los Angeles', director: 'John Thorrington', email: 'sporting@lafc.com', focus: 'U22 initiative signings' },
  { id: 'columbus', name: 'Columbus Crew', short: 'CLB', league: 'MLS', country: 'USA', city: 'Columbus', director: 'Issa Tall', email: 'sporting@columbuscrew.com', focus: 'Ohio-market partnerships' },
  { id: 'atlanta', name: 'Atlanta United', short: 'ATL', league: 'MLS', country: 'USA', city: 'Atlanta', director: 'Chris Henderson', email: 'sporting@atlutd.com', focus: 'Designated player targets' },
];
